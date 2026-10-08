# Screenista public site

Next.js marketing site for [screenista.ai](https://screenista.ai). The advertiser app (`app.screenista.ai`) stays in `screenista-user-next`.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_SITE_URL` before a production build so canonical URLs, the sitemap, and Open Graph links use the live domain.

## Folder map

| Path | Role |
| --- | --- |
| `src/app/(marketing)` | Public, indexable pages. The route group does not appear in the URL. |
| `src/app/sitemap.ts` | Sitemap generated from the content collections. |
| `src/app/robots.ts` | Crawler rules plus the sitemap URL. |
| `src/app/manifest.ts` | Web app manifest. |
| `src/app/feed.xml/route.ts` | RSS feed for the blog. |
| `src/app/opengraph-image.tsx` | Default social image. |
| `src/content` | Typed pages for cities, industries, solutions, cases, and posts. Adding an entry publishes a static URL. |
| `src/lib/seo` | Titles, canonicals, JSON-LD, and the sitemap list. |
| `src/components/layout` | Header, footer, breadcrumbs. |
| `src/components/seo` | JSON-LD script tag. |
| `public/llms.txt` | Plain-language site map for AI answer engines. |

## Search setup

- One `h1` per page, semantic `header` / `main` / `nav` / `footer`, and breadcrumb trails.
- `metadataBase`, title template, description, canonical URL, Open Graph, and Twitter cards.
- Static generation for known URLs via `generateStaticParams`. Unknown slugs return 404.
- JSON-LD for the organization, website, breadcrumbs, FAQs, articles, and city/industry services.
- `sitemap.xml`, `robots.txt`, RSS, a web manifest, and `llms.txt`.
- `next/font` for Syne and IBM Plex so text does not shift while fonts load.
- Security headers in `next.config.ts` (`nosniff`, referrer policy, frame policy).

City, industry, solution, case study, and blog URLs are driven by the files in `src/content`. Add an object there and the page, metadata, and sitemap entry come with it.
