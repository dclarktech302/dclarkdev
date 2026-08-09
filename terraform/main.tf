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