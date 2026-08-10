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

data "aws_route_53_zone" "domain_zone" {
  name = "dclarkdev.com"
}

resource "aws_route53_record" "dclarkdev_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.dclarkdev_cert_validation.domain_validation_options : dvo.domain_name
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
  zone_id = data.aws_route_53_zone.domain_zone.zone_id
}

resource "aws_acm_certificate" "dclarkdev_cert_validation" {
  certificate_arn = aws_aws_certificate.dclarkdev_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.dclarkdev_cert_validation : record.fqdn]
}

