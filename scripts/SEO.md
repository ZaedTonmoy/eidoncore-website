# Public SEO checks

Run `python3 scripts/check-seo.py` from the repository root to check the committed GitHub Pages site. This needs only Python's standard library.

Next.js routes are client-rendered components with server layouts that call `pageMetadata`. Edit `nextjs-homepage/src/content/page-metadata.json` to keep each route's title, description, canonical, Open Graph and Twitter metadata aligned. Add an explicit layout and manifest entry for every new public route.

After source changes:

1. Run `npm ci` in `nextjs-homepage`.
2. Run `npm run build:root` there to refresh the committed static deployment and its matching JavaScript assets.
3. Run `bash generate-sitemap.sh` from the repository root.
4. Run `python3 scripts/check-seo.py` and `git diff --check`.

The generator excludes Next.js build/source directories and error/redirect pages, while retaining the separately maintained static developer and industry pages. Do not add generated build directories to the sitemap or commit `nextjs-homepage/out`.

The GitHub Actions check validates both the committed deployment and a fresh build. It does not deploy or modify the repository. Search engine indexing and ranking still require separate observation after publication.
