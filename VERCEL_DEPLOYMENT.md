# Vercel Deployment Configuration

This project is configured for automatic deployment to Vercel through GitHub Actions.

## Setup Instructions

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### 2. Generate Vercel Token

1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token with deployment permissions
3. Copy the token

### 3. Configure GitHub Secrets

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token from step 2
   - `VERCEL_ORG_ID`: (Optional) Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: (Optional) Your Vercel project ID

### 4. Verify Deployment

1. Push changes to the `main` branch
2. Go to GitHub Actions tab
3. Monitor the deployment workflow
4. Check deployment status in Vercel dashboard

## Configuration Files

- `vercel.json`: Vercel deployment configuration
- `.github/workflows/deploy.yml`: Main deployment workflow
- `.github/workflows/rollback.yml`: Rollback workflow

## Build Configuration

The project builds:
- Client assets to `dist/public` (Vite build)
- Server bundle to `dist/index.js` (esbuild)

## Environment Variables

Vercel automatically handles environment variables from:
- Vercel project settings
- GitHub repository secrets
- Local `.env` files (development)

## Monitoring

- Deployment logs: GitHub Actions → Deploy workflow
- Runtime logs: Vercel Dashboard → Project → Functions
- Performance: Vercel Analytics (if enabled)

## Rollback

Use the GitHub Actions "Rollback Deployment" workflow:
1. Go to Actions tab → Rollback Deployment
2. Enter target commit SHA
3. Select environment (GitHub Pages, Vercel, or both)
4. Run the workflow

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version compatibility
2. **Environment variables**: Verify GitHub secrets are set
3. **API routes**: Ensure server functions are properly configured
4. **Static assets**: Verify build output directory

### Debug Steps

1. Check GitHub Actions logs
2. Verify Vercel deployment logs
3. Test build locally: `npm run build`
4. Check environment variables in Vercel dashboard