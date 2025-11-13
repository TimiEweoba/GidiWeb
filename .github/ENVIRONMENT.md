# Environment Variables Configuration

## GitHub Secrets Required

Configure these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

### Required Secrets
- `VERCEL_TOKEN` - Your Vercel deployment token
  - Get from: Vercel Dashboard → Settings → Tokens
  - Required for: Vercel deployment

### Optional Secrets (if using Vercel CLI with org)
- `VERCEL_ORG_ID` - Vercel organization ID (if applicable)
- `VERCEL_PROJECT_ID` - Vercel project ID

## Local Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Development
NODE_ENV=development
PORT=5000

# Vercel (for local CLI usage)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here  # optional
VERCEL_PROJECT_ID=your_project_id_here  # optional
```

## GitHub Pages Configuration

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Branch: main
4. Folder: / (root)

## Environment Variables in Workflows

The GitHub Actions workflows use these environment variables:

- `NODE_VERSION`: Node.js version (default: 20)
- `PNPM_VERSION`: pnpm version (default: 9)
- `GITHUB_TOKEN`: Automatically provided by GitHub

## Security Best Practices

1. Never commit sensitive data to the repository
2. Use GitHub Secrets for all sensitive information
3. Rotate tokens regularly
4. Use least-privilege access for tokens
5. Monitor deployment logs for sensitive information

## Verification

After setting up secrets:

1. Go to Actions tab in GitHub
2. Run the deployment workflow manually
3. Check that all steps complete successfully
4. Verify deployments are accessible

## Troubleshooting

### Common Issues

1. **VERCEL_TOKEN invalid**: Regenerate token in Vercel dashboard
2. **GitHub Pages not deploying**: Check Pages settings in repository
3. **Build failures**: Check Node.js and pnpm versions match local setup
4. **Permission errors**: Ensure GitHub Actions has necessary permissions

### Debug Steps

1. Check workflow logs in GitHub Actions
2. Verify secrets are correctly configured
3. Test locally with same environment variables
4. Check deployment URLs are accessible