# Royal X Casino — Next.js + Postgres (Neon) CMS

This project is set up to deploy on **GitHub + Vercel + Neon** (Postgres). `server.js` is only used for the alternate cPanel/VPS deployment path (see `docs/CPANEL-DEPLOYMENT.md`) — Vercel ignores it and runs the app as serverless functions.

## Stack
Next.js + TypeScript + Prisma + PostgreSQL (Neon) + secure HTTP-only JWT session + responsive CSS.

## Local setup
Copy `.env.example` to `.env`, fill in your Neon connection strings and secrets, then:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Deploying on GitHub + Vercel + Neon

1. **Neon**: create a project at neon.tech, copy the *pooled* connection string into `DATABASE_URL` and the *unpooled* one into `DIRECT_URL` (both need `?sslmode=require`).
2. **GitHub**: push this repo to a new GitHub repository.
3. **Vercel**: import the GitHub repo as a new project. Add the environment variables below (Production + Preview), keep the default build command (`npm run build`, already runs `prisma generate`).
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL or custom domain)
   - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. Deploy. Then, from your machine (with the Neon `DATABASE_URL`/`DIRECT_URL` in `.env`), run once:
```bash
npx prisma db push
npm run db:seed
```
5. Visit your Vercel URL and `/admin/login`.

Note: `public/uploads` is not persistent on Vercel's serverless filesystem — for production file uploads, use an external store (e.g. Vercel Blob or S3) instead of writing to disk.

## Admin
- `/admin/login`
- `/admin`
- `/admin/games`
- `/admin/posts`
- `/admin/pages`
- `/admin/categories`
- `/admin/settings`

The CMS currently provides complete database-backed game and page management plus dashboard/settings. Posts have public rendering and database structure; the next expansion can add the full post editor and media library.

## Security
- `.env` is ignored by Git.
- Passwords are hashed with bcrypt.
- Sessions use HTTP-only cookies.
- Admin routes require an authenticated user.
- Prisma parameterizes database queries.
- Use HTTPS, backups, least-privilege MySQL users, strong secrets and server/WAF rate limiting before launch.
- Replace starter legal content and verify all third-party/download links.

## SEO
Dynamic `sitemap.xml` and `robots.txt`, Next metadata, canonical-ready SEO fields and JSON-LD for website, software application and HowTo pages are included.
