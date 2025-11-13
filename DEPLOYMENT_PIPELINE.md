# Deployment Pipeline Documentation

## Overview

This project implements a comprehensive deployment pipeline that deploys to GitHub Pages first, then to Vercel, with full rollback capabilities and health monitoring.

## Pipeline Architecture

```
Git Push → GitHub Actions → Build & Test → GitHub Pages → Release → Vercel → Health Check
```

## Components

### 1. GitHub Actions Workflows

#### deploy.yml (Main Pipeline)
- **Triggers**: Push to main, PR to main, manual dispatch
- **Jobs**:
  1. **Build & Test**: Install deps, type-check, test, build artifacts
  2. **GitHub Pages**: Deploy static assets to GitHub Pages
  3. **Release**: Create GitHub release with version tagging
  4. **Vercel**: Deploy to Vercel production
  5. **Health Check**: Verify both deployments are accessible

#### rollback.yml (Rollback System)
- **Triggers**: Manual workflow dispatch
- **Features**: Rollback to any previous commit SHA
- **Environments**: GitHub Pages, Vercel, or both

#### quality.yml (Quality Gates)
- **Triggers**: Every PR and push to main
- **Checks**: Linting, type-checking, tests, security audit

### 2. Deployment Environments

#### GitHub Pages
- **Purpose**: Static hosting for client assets
- **URL**: `https://[username].github.io/[repo-name]/`
- **Content**: `dist/public` directory
- **CDN**: Global CDN via GitHub Pages

#### Vercel
- **Purpose**: Full-stack hosting with serverless functions
- **URL**: Custom domain or `vercel.app` subdomain
- **Content**: Complete application (client + server)
- **Features**: Edge functions, analytics, performance monitoring

### 3. Version Management

- **Tagging**: Automatic version tags on releases
- **Naming**: `v{run_number}` format
- **Artifacts**: Build artifacts stored for 30 days
- **History**: Full deployment history in GitHub releases

## Setup Instructions

### Prerequisites
1. GitHub repository with Actions enabled
2. Vercel account with project configured
3. Node.js 20+ and pnpm 9+

### Initial Setup

1. **Repository Configuration**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/[username]/[repo].git
   git push -u origin main
   ```

2. **GitHub Secrets** (Settings → Secrets → Actions):
   - `VERCEL_TOKEN`: Vercel deployment token
   - `VERCEL_ORG_ID`: Vercel organization ID (optional)
   - `VERCEL_PROJECT_ID`: Vercel project ID (optional)

3. **GitHub Pages Setup**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Branch: main

4. **Vercel Project Setup**:
   - Import GitHub repository
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist/public`

### Environment Variables

#### Required
- `NODE_VERSION`: 20
- `PNPM_VERSION`: 9

#### Optional
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## Deployment Process

### Normal Deployment
1. Push code to `main` branch
2. GitHub Actions automatically triggers
3. Build and test jobs run
4. GitHub Pages deployment
5. Release creation with version tag
6. Vercel deployment
7. Health checks verify accessibility

### Manual Deployment
1. Go to Actions tab → Deploy workflow
2. Click "Run workflow"
3. Select branch (main recommended)
4. Monitor progress in workflow logs

### Deployment Verification

#### GitHub Pages
- Check: `https://[username].github.io/[repo]/`
- Verify: Static assets load correctly
- Test: Client-side routing works

#### Vercel
- Check: Vercel dashboard deployment logs
- Verify: API endpoints respond
- Test: Full application functionality

## Rollback Procedures

### Automatic Rollback
- Health checks fail → Pipeline fails
- No automatic rollback (manual intervention required)

### Manual Rollback
1. Go to Actions tab → Rollback workflow
2. Enter target commit SHA
3. Select environment(s)
4. Run rollback workflow
5. Verify rollback success

### Rollback Verification
- Check GitHub Pages URL
- Check Vercel deployment
- Verify application functionality
- Monitor for issues

## Monitoring & Observability

### GitHub Actions
- Workflow logs in Actions tab
- Build artifacts stored for 30 days
- Deployment history in releases

### Vercel
- Real-time deployment logs
- Performance analytics
- Error tracking
- Function monitoring

### GitHub Pages
- Pages build logs
- CDN performance
- Accessibility monitoring

## Security Considerations

### Secrets Management
- All sensitive data in GitHub Secrets
- No hardcoded credentials
- Regular token rotation
- Least-privilege access

### Deployment Security
- Build isolation in GitHub Actions
- Secure artifact storage
- Verified deployments only
- Rollback capabilities

### Code Security
- Dependency vulnerability scanning
- Security audit in quality checks
- Code review requirements
- Branch protection rules

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify pnpm lockfile integrity
- Review build logs for errors

#### Deployment Failures
- Verify GitHub Secrets configuration
- Check Vercel project settings
- Review deployment logs

#### Health Check Failures
- Verify deployment URLs
- Check application startup
- Review server logs

### Debug Steps

1. **Check Workflow Logs**:
   - Go to Actions tab
   - Find failed workflow run
   - Review step-by-step logs

2. **Verify Secrets**:
   - Check GitHub Secrets configuration
   - Validate Vercel token
   - Test locally with same env vars

3. **Test Locally**:
   ```bash
   npm run build
   npm start
   ```

4. **Check Deployments**:
   - GitHub Pages: Check repository settings
   - Vercel: Check project dashboard

## Best Practices

### Development
- Use feature branches for development
- Run quality checks locally before pushing
- Keep commits atomic and well-described
- Test thoroughly before merging to main

### Deployment
- Deploy frequently in small increments
- Monitor deployments closely
- Keep rollback procedures ready
- Document deployment changes

### Maintenance
- Regular dependency updates
- Security audit scheduling
- Performance monitoring
- Documentation updates

## Support

For issues with the deployment pipeline:
1. Check this documentation first
2. Review GitHub Actions logs
3. Check platform-specific documentation
4. Contact maintainers if needed