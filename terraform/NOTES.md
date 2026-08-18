# Terraform notes / decisions log

Internal reference for choices made in `main.tf`, including code that was
removed from the live config but kept here for context.

## Why the bucket has no website configuration

The static site is served through CloudFront using an Origin Access Control
(OAC), which reads from the S3 **REST** endpoint — not the S3 **website**
endpoint. `aws_s3_bucket_website_configuration` is only needed if something
talks to the website endpoint directly (e.g. no CDN in front, or you want
S3's index/error-document redirect behavior). We don't, so it was dropped.

If we ever serve the bucket directly (no CloudFront) again, this is the
shape to bring back:

```hcl
resource "aws_s3_bucket_website_configuration" "dclarkdev-static-config" {
  bucket = aws_s3_bucket.dclarkdev-static.id

  index_document {
    suffix = "index.html"
  }
}
```

## Why there's only one `aws_s3_bucket_policy`

An earlier draft of the bucket policy granted `s3:GetObject` to `Principal =
"*"` (fully public read), from before CloudFront/OAC was introduced:

```hcl
resource "aws_s3_bucket_policy" "dclarkdev-static_policy" {
  bucket = aws_s3_bucket.dclarkdev-static.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.dclarkdev-static.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.dclarkdev-static_access]
}
```

This is superseded by the policy actually in `main.tf`, which scopes access
to the CloudFront service principal with an `AWS:SourceArn` condition tied
to the distribution — the bucket itself stays fully private
(`aws_s3_bucket_public_access_block` blocks all public access). Don't
reintroduce the `"*"` version; if public read is ever needed again outside
CloudFront, write a new policy rather than restoring this one, since it
predates the OAC setup.

## Why there's only one Origin Access Control

The AWS provider registry example for "restricting S3 access to CloudFront"
declares two things that never got wired up in our config:

```hcl
resource "aws_cloudfront_origin_access_control" "example" {
  name                              = "oac-${aws_s3_bucket.dclarkdev-static.bucket}"
  description                       = "OAC for oac-${aws_s3_bucket.dclarkdev-static.bucket}"
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
      "${aws_s3_bucket.dclarkdev-static.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}
```

`aws_cloudfront_origin_access_control.dclarkdev_oac` (the one actually
referenced by `aws_cloudfront_distribution.s3_distribution`) already covers
the OAC need, so `.example` was just a second, unused copy — deleting it
avoids Terraform creating a real, orphaned OAC in AWS for no reason. (It
was originally named `default` before being renamed to `dclarkdev_oac` for
clarity — a plain resource rename in code, no state impact since it was
never applied.)

`origin_bucket_policy` is the registry's suggested way to build the bucket
policy JSON via `data.aws_iam_policy_document...json`, but our actual
`aws_s3_bucket_policy.dclarkdev-static_policy` builds the same policy
inline with `jsonencode(...)` instead — two ways to express one thing. We
kept the inline version and dropped the unused data source. Worth
revisiting if the policy grows more statements/conditions, where the data
source form reads more cleanly.

## Why there's no `moved` block

```hcl
moved {
  from = aws_s3_bucket.dclarkdev-static
  to   = aws_s3_bucket.dclarkdev-static
}
```

This mapped the bucket resource to itself — a no-op left over from an
earlier rename that never got cleaned up. `moved` blocks are only needed
when the resource address on the *left* differs from the one on the
*right* (e.g. after actually renaming/refactoring a resource in code, so
Terraform updates state instead of destroy+recreate). Safe to omit unless
we do another rename.
