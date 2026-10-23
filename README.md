# RUHANGO PROPERTY CONNECT

The client is a responsive property-listing website built with React and Vite for Ruhango, Muhanga, and Nyanza, with its headquarters in Ruhango. It currently includes sample house and land listings, search and filters, Kinyarwanda/English copy, and WhatsApp contact links.

The page is split into reusable components in `src/components`: `SiteHeader`, `HeroSection`, `ListingsSection`, `AboutSection`, `ContactSection`, and `SiteFooter`. The navigation links scroll to their matching page sections.

## Admin dashboard

Open **Ubuyobozi / Admin** in the site navigation, or go to `/#admin`, to sign in and add, edit, or delete property listings. Visitors can select a listing photo to see its details and send an enquiry with their name and phone number; these enquiries and contact form submissions appear in the dashboard inbox, where they can be reviewed and deleted.

The client uses the Express API in `../server` for listings and contact enquiries. The admin dashboard requires a server-issued login token; configure a strong admin password and keep the server `.env` file private.

## Run the application

1. Create the MySQL database once:

```sql
CREATE DATABASE ruhango_property_connect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Configure the backend from `server/.env.example` (copy it to `server/.env`). Set the MySQL connection fields, an initial `ADMIN_USERNAME`, its bcrypt `ADMIN_PASSWORD_HASH`, and a random `JWT_SECRET` of at least 32 characters. Generate a password hash and JWT secret with:

```sh
node -e "require('bcrypt').hash(process.argv[1], 12).then(console.log)" "choose-a-strong-password"
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

3. In `server`, install and start the API:

```sh
npm install
npm run dev
```

The API creates its tables and inserts the sample listings the first time it starts against an empty database. Check `http://localhost:3001/api/health` for API/MySQL status.

4. In `client`, install and start Vite:

```sh
npm install
npm run dev
```

Vite proxies `/api` requests to `http://localhost:3001`. If the API is hosted elsewhere, set `VITE_API_URL` in the client environment to its base URL. Set `CLIENT_ORIGIN` in the server environment to the deployed client origin.

The admin dashboard at `/#admin` prompts for the username and password stored in the MySQL `admin` table. On first startup, if that table is empty, the API creates its initial account from `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH`. Later logins are checked against the table; changing those environment variables does not change an existing account. If upgrading from an earlier version that used `admin_users`, the API copies its accounts into `admin`. The backend stores admin accounts, listings, and enquiries in MySQL; only authenticated admins can create, edit, or delete listings and view/delete enquiries.

Public page copy in Kinyarwanda and English, together with the business WhatsApp, Instagram, and email details, is stored in the MySQL `site_content` table. The public site loads this content from the API; admins can edit and save it in the website-content section of the dashboard. The database is seeded with the current site copy when the table is first created.

All displayed photos are stored as image bytes in MySQL: each listing can have one to three photos in `property_images`, and the hero/about photos are in `site_images`. On startup, the API migrates older listing photos and seeds the hero/about photos; these imports are limited to HTTPS images from `images.unsplash.com` and files up to 5 MB. Admin uploads accept JPEG, PNG, or WebP files up to 5 MB each. Choose one to three photos when creating a listing. When editing, new photos are added to the existing gallery by default; select **Replace current photos** to replace it. Leaving the picker empty keeps the current photos. The API serves stored photos from its image endpoints. Deleting a listing also deletes its stored photos.
