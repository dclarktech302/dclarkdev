# AWS OIDC setup for GitHub Actions

The `.github/workflows/test.yaml` workflow uses GitHub's OIDC provider to get
short-lived AWS credentials (no static access keys), which then run
`terraform plan`/`apply` in this directory to manage the S3 bucket.

- **Role assumed:** `arn:aws:iam::796973498652:role/so-sweet-co-role`
- **OIDC provider:** `token.actions.githubusercontent.com`, audience `sts.amazonaws.com`

## Gotcha: the `sub` claim is ID-qualified, not `owner/repo`

A trust policy condition like this looks correct but will **never match** for
this repo:

```json
"StringLike": {
    "token.actions.githubusercontent.com:sub": "repo:denkoregroup/so-sweet-co:*"
}