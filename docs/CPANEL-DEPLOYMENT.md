# cPanel deployment checklist

## MySQL
Create:
- Database
- Database user
- User-to-database assignment

Connection:
`mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME`

## Node application
- Node: 20+
- Mode: Production
- Root: `/home/CPANELUSER/royalx-app`
- Startup: `server.js`

## Commands
```bash
cd ~/royalx-app
npm install --omit=dev
npx prisma generate
npx prisma db push
npm run db:seed
npm run build
```

Then restart the application in cPanel.

## Domain and SSL
Point the domain to the VPS, enable SSL/HTTPS, then set `NEXT_PUBLIC_SITE_URL` to the final HTTPS URL and restart the app.
