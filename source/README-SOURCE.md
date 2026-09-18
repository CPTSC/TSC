# TSC V4 editable source

This directory contains the editable TSC V4 website source recovered from the
original Sites project. The source revision is
`30e0f2611ff093473f1726749f4492a74a375fba`.

## Update workflow

1. Make and review website changes in this source directory.
2. Build the site with the pinned dependencies and package manager.
3. Preserve the production launch settings, including public indexing,
   canonical URLs, the approved white favicon, calculator disclosures, and the
   third-party freight disclosure.
4. Validate all routes, the missing-page response, mobile layout, metadata,
   assets, and interactive tools.
5. Copy only the validated Cloudflare output into the repository root:
   `dist/client`, `dist/server`, and any explicitly required deployment files.
6. Run a Cloudflare deployment dry run before requesting a merge to `main`.

The `main` branch is the production deployment branch. Do not merge an
untested source edit or change `wrangler.json` without validating the complete
Cloudflare Worker package.
