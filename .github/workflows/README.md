# GitHub Actions Deployment Configuration

This directory contains GitHub Actions workflows for comprehensive deployment pipeline.

## Workflows

### 1. deploy.yml
Main deployment workflow that:
- Builds and tests the application
- Deploys to GitHub Pages
- Creates GitHub releases with version tagging
- Deploys to Vercel production
- Performs health checks and monitoring

### 2. rollback.yml
Rollback workflow that:
- Allows manual rollback to previous deployments
- Supports both GitHub Pages and Vercel rollbacks
- Maintains deployment history

### 3. quality.yml
Quality assurance workflow that:
- Runs on every PR and push to main
- Performs linting and type-checking
- Runs test suite
- Conducts security audits

## Required Secrets

Configure these in your GitHub repository settings:

- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID (if applicable)
- `VERCEL_PROJECT_ID` - Vercel project ID

## Environment Variables

The workflows use these environment variables:
- `NODE_VERSION`: Node.js version (default: 20)
- `PNPM_VERSION`: pnpm version (default: 9)

## Deployment Process

1. **Build & Test**: Runs on every push to main
2. **GitHub Pages**: Deploys static assets to GitHub Pages
3. **Release**: Creates GitHub release with version tagging
4. **Vercel**: Deploys to Vercel production environment
5. **Health Check**: Verifies deployments are accessible

## Rollback Process

1. Go to Actions tab in GitHub
2. Select "Rollback Deployment" workflow
3. Enter the target SHA to rollback to
4. Select environment (GitHub Pages, Vercel, or both)
5. Run the workflow

## Monitoring

- Deployment status is shown in commit status checks
- Health checks run after each deployment
- Deployment history is maintained in GitHub releases
- Rollback capabilities are available for quick recovery