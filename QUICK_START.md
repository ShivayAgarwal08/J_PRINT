# 🚀 Quick Start: Deploy to Railway in 5 Minutes

This is the fastest way to get your JPrint app deployed to Railway.

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Railway deployment"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

## Step 2: Deploy on Railway (3 minutes)

1. **Go to** [railway.app](https://railway.app) and login
2. **Click** "New Project" → "Deploy from GitHub repo"
3. **Select** your JPrint repository
4. **Click** "+ New" → "Database" → "PostgreSQL"
5. **Click** on your web service → "Variables" tab
6. **Add these variables**:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - `VENDOR_EMAIL` = `vender@gmail.com`
   - `VENDOR_PASSWORD` = `your-secure-password`
   - `JWT_SECRET` = `your-long-random-secret-key`
   - `NODE_ENV` = `production`

7. **Wait** for deployment to complete
8. **Click** "Settings" → "Networking" → "Generate Domain"
9. **Run migrations** (choose one):

   **Option A: Via Dashboard**
   - Settings → Deploy → Custom Start Command
   - Enter: `npx prisma migrate deploy && npm start`
   - Redeploy
   - After success, change back to `npm start`

   **Option B: Via CLI**

   ```bash
   npm i -g @railway/cli
   railway login
   railway link
   railway run npx prisma migrate deploy
   ```

10. **Visit** your app URL and test!

## ✅ Done!

Your app is live at: `https://your-app.up.railway.app`

---

## 🆘 Need Help?

- **Detailed Guide**: See `RAILWAY_DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Changes Made**: See `CHANGES_SUMMARY.md`

---

## 🔐 Security Reminder

⚠️ **IMPORTANT**: Change these from defaults:

- `VENDOR_PASSWORD` - Use a strong password
- `JWT_SECRET` - Use a long random string (32+ characters)

Generate a strong JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎉 That's It!

Your JPrint application is now deployed and running on Railway!
