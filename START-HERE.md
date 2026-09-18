# TSC V4 — prebuilt Cloudflare Workers deployment

Prepared September 13, 2026. This package contains the latest V4 compiled website, including the approved white TSC favicon. No application coding, dependency installation for the site, or site build is required to deploy this artifact. Cloudflare account authorization and the deployment tool are still required.

## Host instructions

1. Extract this ZIP into its own directory. Use Cloudflare Workers, not WordPress or a static-only Pages upload.
2. Have Node.js 22.13 or newer installed. From this extracted directory, authenticate with the intended Cloudflare account:

   npx wrangler@4.92.0 login

3. Optional independent preflight (does not publish):

   npx wrangler@4.92.0 deploy --dry-run --config wrangler.json

4. Deploy the already-built website:

   npx wrangler@4.92.0 deploy --config wrangler.json

The configuration sets no_bundle:true, so this uploads the existing compiled modules and assets without rebuilding them. npx may download the deployment tool itself. No npm/pnpm install or application build command is needed. If your account already has a Worker called tsc-website-v4, select a distinct name with Wrangler's --name option to avoid overwriting another Worker.

The package requires only the ASSETS binding defined in wrangler.json. No database, object-storage bucket, API key, email integration, ChatGPT login, or original Sites project access is needed to run it. Cloudflare may require account/plan selection and authorization. Do not supply passwords or tokens to TSC by email.

## Domain and launch

After validating the workers.dev preview, attach transactionsolutionsconsulting.com and www.transactionsolutionsconsulting.com through Cloudflare's custom-domain workflow. Your domain must be managed in a supported Cloudflare zone for that workflow; account/DNS onboarding is separate from uploading this package. Preserve all Google email MX, SPF, DKIM, DMARC, and verification records if moving DNS. Back up the full zone before any nameserver changes and review DNSSEC with the DNS provider when transferring DNS authority.

Select https://transactionsolutionsconsulting.com as the canonical address, redirect www to it, and arrange permanent redirects from old WordPress URLs after checking the existing URL inventory. Do not blanket-redirect unrelated pages to the homepage. Verify certificates and IPv4/IPv6 routing, mail delivery, booking, and site access before retiring old hosting. Keep the existing site/backup available for rollback.

This package is prepared for public indexing: HTML robots metadata permits indexing and robots.txt permits crawling. Protect an unlaunched preview with Cloudflare Access if necessary; do not rely on robots.txt for privacy. Canonical URLs and sharing images use transactionsolutionsconsulting.com, so social previews must be tested after the real domain points here. Submit the included sitemap after cutover.

## What was verified

- Cloudflare Wrangler 4.92.0 deployment dry run accepted the prebuilt modules and 58 static assets.
- The package started in Cloudflare's local Worker runtime without a site build.
- All 14 sitemap pages returned HTTP 200 with one main heading each.
- The favicon and social image were served successfully; an unknown page returned HTTP 404.
- Public-page metadata allowed indexing; robots.txt and the sitemap were checked.
- The card-fee calculator updated to $840 annually for $100,000 monthly card volume and 50% commercial share (20% nonqualifying assumption and 0.70% fee difference).
- A 390px mobile layout check found no horizontal overflow on the card page.
- No ChatGPT/OpenAI references were found in the compiled client/server files or tested page responses.

Not verified: deployment in YOUR Cloudflare account, custom-domain ownership/SSL/DNS, full browser/assistive-technology coverage, actual email delivery or a completed booking, live freight rates, and every historic WordPress redirect. This is a technically validated deployment artifact, not legal certification or an assertion that the domain migration is already complete.

## Features preserved

Booking and email links remain as configured. Freight remains a third-party embedded estimator, not an independent TSC rate engine; vendor availability/layout changes can still affect it, and results are not automatically emailed to TSC. The integration checker remains informational. The card calculator remains illustrative, not a savings guarantee. Privacy, Terms, and Accessibility pages are included.

## Provenance and maintenance

Base source revision: 30e0f2611ff093473f1726749f4492a74a375fba, the latest V4 white-logo deployment. This standalone artifact removes original hosting registration/configuration from the deployment path and adds a Cloudflare-owned root configuration. Its only application-output adjustment changes the explicit prelaunch robots metadata from noindex/nofollow to index/follow; public robots.txt now allows crawling. The original private V4 deployment is unchanged.

For future edits, retain the separate source ZIP. Apply matching launch changes in source app/layout.tsx, app/robots.ts and public/robots.txt when producing subsequent independent builds. Do not replace this tested artifact with the old source ZIP's private/noindex build. This package contains no source credentials or account tokens, and should be sent via a restricted Drive/file-sharing link rather than a Gmail attachment because it contains JavaScript.

Official references:
https://developers.cloudflare.com/workers/wrangler/bundling/
https://developers.cloudflare.com/workers/static-assets/binding/
https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
