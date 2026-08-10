provider "aws" {
  region = "us-east-1" # to use ACM with CloudFront
}

terraform {
    backend "s3" {
        bucket = "tf-resources-github-actions"
        region = "us-east-1"
        key = "dclarkdev-tfstate/terraform.tfstate"
        encrypt = true
        use_lockfile = true
    }
}