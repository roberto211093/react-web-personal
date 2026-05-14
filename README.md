# react-web-personal

Demo (production): https://www.rafaelacosta.cl/

This project was bootstrapped with Create React App and uses `pnpm` as package manager.

## Quick start

Install dependencies:

```bash
pnpm install
```

Start development server (live reload):

```bash
pnpm start
```

Open http://localhost:3000 and edit files — the page reloads automatically.

Run tests (CI-friendly):

```bash
CI=true pnpm test
```

Create production build:

```bash
pnpm build
```

Serve the static build locally (example script included):

```bash
PORT=5001 node scripts/serve-build.js
```

## Deploy to Vercel (recommended)

This repo includes a `vercel.json` which tells Vercel to serve the SPA (rewrites everything to `index.html`) and to use the `build` folder created by `pnpm build`.

To deploy and have Vercel pick up the latest changes:

1. Commit and push your changes to the branch connected to Vercel (for example `master` or `main`):

```bash
git add .
git commit -m "Update privacy/terms page and styles"
git push origin master
```

2. In the Vercel dashboard, make sure the project is linked to your GitHub/GitLab/Bitbucket repo and that the correct branch is selected.

3. Trigger a new deployment by pushing to the branch, or by clicking "Deploy" / "Redeploy" in the Vercel UI.

4. Wait for the deployment to finish and visit `https://<your-vercel-domain>/privacy-policy` — thanks to `vercel.json` the client-side route will resolve.

If you want the custom domain `https://www.rafaelacosta.cl` to point to the new deployment:

- In Vercel, go to Project → Settings → Domains and add `www.rafaelacosta.cl` (and `rafaelacosta.cl` if needed).
- Follow the DNS instructions Vercel shows (CNAME / A records). After DNS propagation, Vercel will provision HTTPS automatically.

## Verify in Google Search Console

Once the custom domain is active and serving the new content, add the URL to Google Search Console:

1. Open https://search.google.com/search-console and add your property (use the `https://www.rafaelacosta.cl` domain property).
2. Verify ownership following Vercel instructions (usually DNS TXT record or using the automatic verification if Vercel provides it).
3. Use the URL Inspection tool and request indexing for `https://www.rafaelacosta.cl/privacy-policy`.

Notes:
- If your app served a previous build with a service worker, clear or unregister it to avoid stale cached content.
- If Vercel shows a 404 for the client-side route, ensure `vercel.json` exists and is committed (it is included in this repo) so rewrites send requests to `index.html`.

## Troubleshooting CORS in development

- If your app fetches menus or other data from an external API and you see CORS errors in the console, you can:
	- Enable CORS on the API side (best).
	- Add `"proxy": "https://your-api-host"` to `package.json` for local development with CRA (then use relative paths for API calls).
	- Use a local mock of the API while developing.

