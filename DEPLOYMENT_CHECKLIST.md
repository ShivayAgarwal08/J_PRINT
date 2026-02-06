# 🚀 Railway Deployment Quick Checklist

Use this checklist to ensure you've completed all steps for deploying to Railway.

## ✅ Pre-Deployment Checklist

### Local Setup

- [ ] Run `npm install` to install all dependencies including `rimraf`
- [ ] Create `.env` file from `.env.example`
- [ ] Update `.env` with your local database credentials (if testing locally)
- [ ] Test build locally: `npm run build`
- [ ] Verify `dist/` folder is created

### GitHub Setup

- [ ] Initialize Git repository: `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Prepare for Railway deployment"`
- [ ] Create GitHub repository (without README/gitignore)
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] Push to GitHub: `git push -u origin main`

## 🚂 Railway Deployment Checklist

### Project Setup

- [ ] Sign up/login to [railway.app](https://railway.app)
- [ ] Create new project
- [ ] Deploy from GitHub repo
- [ ] Select your JPrint repository

### Database Setup

- [ ] Add PostgreSQL database to project
- [ ] Verify database is provisioned (green status)

### Environment Variables

Configure these in Railway web service → Variables:

- [ ] `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
- [ ] `VENDOR_EMAIL` = `vender@gmail.com` (or your preferred email)
- [ ] `VENDOR_PASSWORD` = **CHANGE THIS TO SECURE PASSWORD**
- [ ] `JWT_SECRET` = **GENERATE STRONG RANDOM STRING**
- [ ] `NODE_ENV` = `production`
- [ ] **DO NOT** add `PORT` (Railway sets this automatically)

### Database Migration

Choose ONE method:

**Method 1: Temporary Start Command**

- [ ] Go to Settings → Deploy
- [ ] Set Custom Start Command: `npx prisma migrate deploy && npm start`
- [ ] Redeploy
- [ ] After success, change back to: `npm start`

**Method 2: Railway CLI**

- [ ] Install: `npm i -g @railway/cli`
- [ ] Login: `railway login`
- [ ] Link project: `railway link`
- [ ] Run migrations: `railway run npx prisma migrate deploy`

### Verification

- [ ] Check deployment logs for errors
- [ ] Verify build completed successfully
- [ ] Generate domain in Settings → Networking
- [ ] Visit your app URL
- [ ] Test homepage loads
- [ ] Test user registration
- [ ] Test user login
- [ ] Test vendor login (with new credentials)
- [ ] Test creating an order
- [ ] Check API health: `https://your-app.up.railway.app/api/health`

## 🔐 Security Checklist

- [ ] Changed `VENDOR_PASSWORD` from default
- [ ] Generated strong random `JWT_SECRET` (min 32 characters)
- [ ] Verified `.env` is in `.gitignore`
- [ ] No sensitive data committed to GitHub
- [ ] All environment variables set in Railway

## 📊 Post-Deployment

- [ ] Monitor deployment logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring/alerts
- [ ] Document your Railway app URL
- [ ] Test all major features in production

## 🔄 Future Updates

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Railway will automatically detect and redeploy.

---

## 📝 Important URLs

- **Railway Dashboard**: https://railway.app/dashboard
- **Your App**: `https://[your-app].up.railway.app`
- **API Health Check**: `https://[your-app].up.railway.app/api/health`
- **GitHub Repo**: `https://github.com/[username]/[repo]`

---

## 🆘 Common Issues

### Build Fails

- Check if `rimraf` is installed: `npm install rimraf`
- Verify `postinstall` script exists in package.json
- Check build logs for specific errors

### Database Connection Error

- Verify `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
- Ensure PostgreSQL service is running
- Run migrations: `railway run npx prisma migrate deploy`

### 404 on Frontend Routes

- Verify `dist/` was created during build
- Check server logs for "Static Assets MISSING"
- Ensure `npm run build` completed successfully

### Vendor Login Fails

- Double-check `VENDOR_EMAIL` and `VENDOR_PASSWORD` in Railway variables
- Ensure no extra spaces in credentials
- Check server logs for authentication errors

---

**Need detailed help?** See `RAILWAY_DEPLOYMENT.md` for full instructions.
