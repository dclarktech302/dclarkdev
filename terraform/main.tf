resource "aws_s3_bucket" "dclarkdev-static" {
  bucket = var.bucket_name
}

# moved {
#   from = aws_s3_bucket.dclarkdev-static
#   to   = aws_s3_bucket.dclarkdev-static
# }

# resource "aws_s3_bucket_website_configuration" "dclarkdev-static-config" {
#   bucket = aws_s3_bucket.dclarkdev-static.id

#   index_document {
#     suffix = "index.html"
#   }
# }

resource "aws_s3_bucket_public_access_block" "dclarkdev-static_access" {
  bucket = aws_s3_bucket.dclarkdev-static.id
  block_public_acls = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}

# resource "aws_s3_bucket_policy" "dclarkdev-static_policy" {
#   bucket = aws_s3_bucket.dclarkdev-static.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Principal = "*"
#         Action = "s3:GetObject"
#         Resource = "${aws_s3_bucket.dclarkdev-static.arn}/*"
#       }
#     ]
#   })

#   depends_on = [ aws_s3_bucket_public_access_block.dclarkdev-static_access ]
# }

resource "aws_acm_certificate" "dclarkdev" {
  domain_name = "dclarkdev.com"
  validation_method = "DNS"

  subject_alternative_names = ["www.dclarkdev.com"]

  tags = {
    Name = "dclarkdev.com SSL cert"
  }

  lifecycle {
    create_before_destroy = true
  }
}

data "aws_route53_zone" "domain_zone" {
  name = "dclarkdev.com"
}

resource "aws_route53_record" "dclarkdev_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.dclarkdev.domain_validation_options : dvo.domain_name
    =>{
      name = dvo.resource_record_name
      record = dvo.resource_record_value
      type = dvo.resource_record_type
    }
  }

  name = each.value.name
  records = [each.value.record]
  ttl = 60
  type = each.value.type
  zone_id = data.aws_route53_zone.domain_zone.zone_id
}

resource "aws_acm_certificate_validation" "dclarkdev_cert_validation" {
  certificate_arn = aws_acm_certificate.dclarkdev.arn
  validation_record_fqdns = [for record in aws_route53_record.dclarkdev_cert_validation : record.fqdn]
}

resource "aws_cloudfront_origin_access_control" "example" {
  name                              = "oac-${aws_s3_bucket.dclarkdev_static.bucket}"
  description                       = "OAC for oac-${aws_s3_bucket.dclarkdev_static.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
data "aws_iam_policy_document" "origin_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalReadWrite"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.b.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

data "aws_acm_certificate" "my_domain" {
  region   = "us-east-1"
  domain   = "*.${local.my_domain}"
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "default-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.dclarkdev_static.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "S3-${aws_s3_bucket.dclarkdev_static.bucket}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distro for ${aws_s3_bucket.dclarkdev_static.bucket}"
  default_root_object = "index.html"

  aliases = ["dclarkdev.com", "www.dclarkdev.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.dclarkdev_static.bucket}"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.dclarkdev_cert.arn
    ssl_support_method  = "sni-only"
  }

  depends_on = [aws_acm_certificate_validation.dclarkdev_cert_validation]
}

resource "aws_s3_bucket_policy" "dclarkdev-static_policy" {
  bucket = aws_s3_bucket.dclarkdev-static.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.dclarkdev-static.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })

  depends_on = [ aws_s3_bucket_public_access_block.dclarkdev-static_access ]
}

# Create Route53 records for the CloudFront distribution aliases
data "aws_route53_zone" "my_domain" {
  name = local.my_domain
}

resource "aws_route53_record" "cloudfront" {
  for_each = aws_cloudfront_distribution.s3_distribution.aliases
  zone_id  = data.aws_route53_zone.my_domain.zone_id
  name     = each.value
  type     = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

