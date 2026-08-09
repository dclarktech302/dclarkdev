provider "aws" {
  
}

terraform {
    backend "s3" {
        bucket = "tf-resources-github-actions"
        region = "us-east-1"
        key = "dclarkdev-tfstate/terraform.tfstate"
        encrypt = true
        dynamodb_table = "tf-resources-github-actions"
    }
}