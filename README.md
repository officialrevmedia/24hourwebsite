# 24hourwebsite.ca

Campaign landing page for the 24 Hour Website offer, powered by Rev Media.

## Files
- `index.html` — the site
- `404.html` — branded not-found page (served automatically by GitHub Pages)
- `thankyou.html` — form success page
- `styles.css`, `app.js` — styles and interactions
- `assets/` — images, logos, favicon, OG image
- `CNAME` — custom domain for GitHub Pages
- `robots.txt`, `sitemap.xml`, `.nojekyll` — SEO / Pages config

## Deploy to GitHub Pages
1. Create a new GitHub repository and upload **all** of these files at the repo root (keep the `assets/` folder intact).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Under **Custom domain**, the `CNAME` file already sets `24hourwebsite.ca`. Confirm it shows there.
5. At your domain registrar, point DNS to GitHub Pages:
   - Four `A` records on the apex (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record on `www` → `<your-github-username>.github.io`
6. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued.

> **Domain note:** the `CNAME` file is set to `24hourwebsite.ca`. If your registered domain is spelled differently, edit `CNAME` (and the absolute URLs in `index.html` / `sitemap.xml` / `robots.txt`) to match exactly.

## Contact form
The intake form posts to **FormSubmit** so submissions email **info@revmedia.ca** with no backend.
- The **first** time the form is submitted, FormSubmit sends a one-time activation email to `info@revmedia.ca`. Click the link in it once to start receiving submissions.
- On success the page shows an inline confirmation; if JavaScript is off, it redirects to `thankyou.html`.

## SEO included
- Optimized `<title>`, meta description, keywords, canonical, Open Graph + Twitter cards
- `ProfessionalService` and `FAQPage` structured data (JSON-LD)
- `sitemap.xml` + `robots.txt`
- Outbound links to live client sites and a backlink to revmedia.ca
- Compressed images for fast load and mobile-first responsive layout
