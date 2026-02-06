I need to deploy my full-stack JPrint application to Railway. Here are the details:

**Tech Stack:**

- Frontend: React 19 + Vite 6 + Tailwind CSS
- Backend: Node.js 22 + Express.js (CommonJS)
- Database: PostgreSQL with Prisma ORM 6.10.1
- Build Tool: Vite (outputs to /dist folder)

**Project Structure:**

- Monorepo with frontend (src/) and backend (server/) in same repo
- Backend serves built frontend from /dist folder
- API routes at /api/\*
- Single service deployment (not separate frontend/backend)

**Build Process:**

```
npm ci
npx prisma generate
npm run build (runs: rimraf dist && npx prisma generate && vite build)
```

**Start Command:**

```
npm start (runs: node server/index.cjs)
```

**Server Configuration:**

- Listens on process.env.PORT || 3000
- Binds to 0.0.0.0
- Serves static files from ../dist
- Catch-all route serves index.html for SPA

**Database Schema (3 tables):**

1. users (id, name, email, password, role, phone, created_at)
2. orders (id, userId, files, settings, totalAmount, status, otp, created_at)
3. inventory (id, name, category, price, stock, status, created_at)

**Environment Variables Needed:**

- DATABASE_URL (should be ${{Postgres.DATABASE_URL}} on Railway)
- VENDOR_EMAIL
- VENDOR_PASSWORD
- JWT_SECRET
- NODE_ENV=production
- PORT (auto-set by Railway)

**Files Already Configured:**

- nixpacks.toml (Railway build config)
- Procfile (web: npm start)
- prisma/migrations/ (migration files ready)
- .env.example (template)

**Key Requirements:**

1. Need PostgreSQL database provisioned
2. Must run "npx prisma migrate deploy" before first start
3. Build must complete before server starts
4. Server must use Railway's PORT variable

**My Questions:**

1. Step-by-step Railway deployment guide
2. How to set up PostgreSQL and run migrations
3. How to configure DATABASE_URL reference
4. How to verify deployment success
5. Troubleshooting common issues

Please provide detailed deployment instructions for Railway.
