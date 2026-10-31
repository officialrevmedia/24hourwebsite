# 24hourwebsite.ca

Website, logo and brand kit in 24 hours for $499. A Rev Media service. Plain HTML, CSS and JavaScript, hosted on GitHub Pages. Every page is pre-rendered: the full content is in the HTML that Google receives, with no build step and no framework.

## Upload

1. Open the GitHub repository that publishes 24hourwebsite.ca and choose **Add file > Upload files**.
2. Drag in everything from this folder, including the `assets` folder and the hidden `.nojekyll` file (on a Mac, press Cmd + Shift + . in Finder to show hidden files).
3. Commit to `main`. GitHub Pages republishes within a minute or two.

Files from the previous version that are no longer used and can be deleted: `styles.css`, `app.js`, and the old `.jpg` and `.png` files sitting directly inside `assets/` (the new images live in `assets/img/`). Leaving them does no harm.

`CNAME` keeps the custom domain set to `24hourwebsite.ca`. The old `thankyou.html` address still works and forwards to `/thank-you/`.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/work/` | All 9 case studies |
| `/pricing/` | What is included for $499 |
| `/how-it-works/` | Process and guarantee |
| `/faq/` | FAQ |
| `/start/` | Intake form |
| `/privacy/` | Privacy policy |
| `/thank-you/` | Form confirmation (not indexed) |
| `404.html` | Custom not-found page (not indexed) |

## Forms

The intake forms on `/`, `/work/` and `/start/` send to **info@revmedia.ca** through FormSubmit. If FormSubmit asks for activation, click the link in the email it sends to info@revmedia.ca, then test again.

## Google Analytics

Open `analytics.js`, paste your GA4 Measurement ID (starts with `G-`) between the quotes, and upload that one file. Leave it empty and nothing loads. Events sent: `generate_lead` (intake sent), `click_call`, `click_email`.

## SEO built in

Unique title and meta description on every page, one H1 per page, canonical tags, Open Graph and Twitter images, breadcrumbs (visible and in schema), ProfessionalService, Offer, FAQPage, HowTo and BreadcrumbList structured data, `sitemap.xml`, `robots.txt` open to Google and AI crawlers, WebP images with alt text and fixed dimensions, a self-hosted font, and no redirect chains.
