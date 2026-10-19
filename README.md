# Caleb Chang's Personal Website

This is a personal portfolio site with a blog. It includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Syntax highlighting
- Tailwind v4
- Geist font

## GitHub Pages deployment

This site is configured for a static export and deploys automatically through
[`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

To use the user-site URL `https://0cchang.github.io`, rename the GitHub
repository to `0cchang.github.io`, then enable **Settings → Pages → GitHub
Actions** as the build and deployment source. Pushes to `main` will build the
site and publish the generated `out` directory.

The site, including blog posts, book notes, videos, RSS, sitemap, and robots
metadata, is statically generated.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

Changes pushed to `main` are built and deployed automatically by GitHub Actions.

### Updating book notes

The current reading diary is stored in [`app/books/data.ts`](./app/books/data.ts). To add or update a chapter, edit the matching book’s `chapters` array, then run the site locally to preview it:

```bash
pnpm dev
```

When the notes look right, commit and push the update:

```bash
git add app/books/data.ts
git commit -m "Update Hamming reading notes"
git push origin main
```

GitHub Actions automatically redeploys the production site after the push. If
you are working on a feature branch, push that branch and merge it into `main`
when ready.

### Videos

The Videos page is ready for future additions, but currently has no embeds.
