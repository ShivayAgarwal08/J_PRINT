# 🚀 Railway Deployment Guide for JPrint

This guide will walk you through deploying your full-stack JPrint application (React + Vite frontend + Express backend + PostgreSQL) to Railway.

## 📋 Prerequisites

1. ✅ **GitHub Account** - Your code must be in a GitHub repository
2. ✅ **Railway Account** - Sign up at [railway.app](https://railway.app/)
3. ✅ **Git Installed** - To push your code to GitHub

---

## 🔧 Step 1: Prepare Your Local Environment

### 1.1 Install Dependencies

```bash
npm install
```

### 1.2 Create a Local .env File

Copy `.env.example` to `.env` and update with your local PostgreSQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/jprint"
VENDOR_EMAIL="vender@gmail.com"
VENDOR_PASSWORD="vender123"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="development"
PORT=3000
```

### 1.3 Test Locally (Optional but Recommended)

If you have PostgreSQL installed locally:

```bash
# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

---

## 📤 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Prepare for Railway deployment"
```

### 2.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. **DO NOT** initialize with README, .gitignore, or license (you already have these)

### 2.3 Push Your Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🚂 Step 3: Deploy to Railway

### 3.1 Create New Project

1. Go to [railway.app](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select your **JPrint repository**

### 3.2 Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically provision a PostgreSQL database
4. The database will be automatically linked to your service

### 3.3 Configure Environment Variables

1. Click on your **web service** (the one connected to GitHub)
2. Go to the **"Variables"** tab
3. Click **"+ New Variable"** and add the following:

| Variable Name     | Value                         | Description                                     |
| ----------------- | ----------------------------- | ----------------------------------------------- |
| `DATABASE_URL`    | `${{Postgres.DATABASE_URL}}`  | Auto-links to Railway PostgreSQL                |
| `VENDOR_EMAIL`    | `vender@gmail.com`            | Admin vendor email                              |
| `VENDOR_PASSWORD` | `vender123`                   | Admin vendor password (change this!)            |
| `JWT_SECRET`      | `your-long-random-secret-key` | JWT signing secret (use a strong random string) |
| `NODE_ENV`        | `production`                  | Environment mode                                |

**Important Notes:**

- Railway automatically sets the `PORT` variable - **DO NOT** add it manually
- For `DATABASE_URL`, use the reference syntax `${{Postgres.DATABASE_URL}}` to auto-link
- **Change the vendor password** to something secure!
- Generate a strong `JWT_SECRET` (use a password generator)

### 3.4 Run Database Migrations

After the first deployment, you need to run migrations:

1. Click on your **web service**
2. Go to **"Settings"** → **"Deploy"**
3. Under **"Custom Start Command"**, temporarily add:
   ```
   npx prisma migrate deploy && npm start
   ```
4. Click **"Redeploy"**
5. After successful deployment, you can remove the migration command and just use `npm start`

**Alternative Method (Using Railway CLI):**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run npx prisma migrate deploy
```

---

## 🎯 Step 4: Verify Deployment

### 4.1 Check Build Logs

1. Click on your web service
2. Go to **"Deployments"**
3. Click on the latest deployment
4. Check the logs for:
   - ✅ `npm ci` completed
   - ✅ `npx prisma generate` completed
   - ✅ `npm run build` completed
   - ✅ Server started on PORT

### 4.2 Access Your Application

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Railway will provide a public URL like: `https://jprint-production.up.railway.app`
4. Open the URL in your browser

### 4.3 Test the Application

- ✅ Homepage loads correctly
- ✅ Can register a new user
- ✅ Can login
- ✅ Can create an order
- ✅ Vendor dashboard works (use vendor credentials)

---

## 🔍 Troubleshooting

### Build Fails with "Prisma Generate Error"

**Solution:** Make sure `postinstall` script is in `package.json`:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Error

**Solution:**

1. Verify `DATABASE_URL` is set correctly: `${{Postgres.DATABASE_URL}}`
2. Make sure PostgreSQL service is running
3. Check if migrations were run: `railway run npx prisma migrate deploy`

### Static Files Not Loading (404 errors)

**Solution:**

1. Check build logs to ensure `vite build` completed successfully
2. Verify `dist/` folder was created during build
3. Check server logs for "Static Assets MISSING" error

### Port Binding Error

**Solution:**

- Remove any hardcoded `PORT` variable
- Railway automatically assigns a port
- Your code already handles this: `const PORT = Number(process.env.PORT) || 3000;`

### Application Crashes on Start

**Solution:**

1. Check deployment logs for error messages
2. Verify all environment variables are set
3. Ensure database migrations were run
4. Check that `NODE_ENV=production` is set

---

## 🔄 Updating Your Application

### Push Updates

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Railway will automatically detect the push and redeploy your application.

### Manual Redeploy

1. Go to your service in Railway
2. Click **"Deployments"**
3. Click **"Redeploy"** on the latest deployment

---

## 📊 Monitoring

### View Logs

1. Click on your web service
2. Go to **"Deployments"**
3. Click on a deployment to view logs
4. Or use the **"Observability"** tab for real-time logs

### Database Management

1. Click on your PostgreSQL service
2. Go to **"Data"** to view tables
3. Or use **"Connect"** to get connection details for external tools

---

## 🔐 Security Checklist

- [ ] Changed default `VENDOR_PASSWORD` to a strong password
- [ ] Generated a strong random `JWT_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Reviewed all environment variables
- [ ] Tested vendor login with new credentials
- [ ] Verified `.env` is in `.gitignore` (it is!)

---

## 🎉 Success!

Your JPrint application should now be live on Railway!

**Your URLs:**

- **Frontend & Backend:** `https://your-app.up.railway.app`
- **API Health Check:** `https://your-app.up.railway.app/api/health`

---

## 📞 Support

If you encounter issues:

1. Check Railway deployment logs
2. Review the troubleshooting section above
3. Check Railway's [documentation](https://docs.railway.app/)
4. Visit Railway's [Discord community](https://discord.gg/railway)

---

## 🚀 Next Steps

- Set up a custom domain in Railway settings
- Configure monitoring and alerts
- Set up automated backups for your database
- Implement CI/CD workflows
- Add environment-specific configurations

Good luck with your deployment! 🎊
