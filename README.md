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

The Spotify listening section requires a server runtime and is hidden on the
static GitHub Pages deployment. The rest of the site, including blog posts,
book notes, videos, RSS, sitemap, and robots metadata, is statically generated.

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

### Spotify listening

The homepage can show your top artists and recently played songs. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), then add these values to a local `.env.local` file:

```bash
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
```

Generate the refresh token locally so your production website never handles Spotify authorization. Add this exact redirect URI to your Spotify app:

```text
http://127.0.0.1:8888/callback
```

Create a local `.env` file with your client credentials, then run:

```bash
SPOTIFY_CLIENT_ID=your-client-id SPOTIFY_CLIENT_SECRET=your-client-secret node scripts/spotify-auth.mjs
```

Open the URL printed in the terminal and approve the required scopes. Copy
the refresh token into `.env.local` as `SPOTIFY_REFRESH_TOKEN`. Generate a new
token after changing scopes. Do not commit `.env` or the token.

Spotify listening data is fetched during each GitHub Actions build and published
as a static JSON file. Add these repository secrets under **Settings → Secrets
and variables → Actions** to enable it:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

The workflow publishes an empty summary when these secrets are not configured,
so the rest of the site can still deploy.

### Videos

The Videos tab uses YouTube embeds. This keeps video storage, transcoding,
adaptive streaming, thumbnails, and bandwidth off the website deployment.
Upload a video to YouTube, choose **Public** or **Unlisted**, and copy the ID
from its URL:

```text
https://www.youtube.com/watch?v=VIDEO_ID
```

Register the ID in [`app/videos/data.ts`](./app/videos/data.ts):

```ts
export const videos = [
  {
    title: 'My demo',
    description: 'A short description.',
    youtubeId: 'VIDEO_ID',
    publishedAt: 'October 2026',
  },
]
```

Commit and deploy the catalog change to GitHub Pages:

```bash
git add app/videos/data.ts
git commit -m "Add demo video"
git push
```

The site uses YouTube’s privacy-enhanced `youtube-nocookie.com` embed domain.
Unlisted videos will not appear in YouTube search, but anyone with the link can
watch them. Private videos cannot be embedded for public visitors.
