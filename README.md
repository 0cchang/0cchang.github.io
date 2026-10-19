# Caleb Chang's Personal Website

This is a porfolio site template complete with a blog. Includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
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

## Demo

https://portfolio-blog-starter.vercel.app

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/blog&project-name=blog&repository-name=blog)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/blog blog
```

Then, run Next.js in development mode:

```bash
pnpm dev
```

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

Vercel automatically redeploys the production site after the push. If you are working on a feature branch, push that branch and merge it into `main` when ready.

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

Open the URL printed in the terminal, approve the `user-read-currently-playing`, `user-top-read`, and `user-read-recently-played` scopes, and copy the refresh token printed by the script into Vercel as `SPOTIFY_REFRESH_TOKEN`. Generate a new token after changing scopes. Do not commit `.env` or the token.

Deploy it to the cloud with [Vercel](https://vercel.com/templates) ([Documentation](https://nextjs.org/docs/app/building-your-application/deploying)).

### Videos

The Videos tab uses YouTube embeds. This keeps video storage, transcoding,
adaptive streaming, thumbnails, and bandwidth off the Vercel deployment.
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

Commit and deploy the catalog change to Vercel:

```bash
git add app/videos/data.ts
git commit -m "Add demo video"
git push
```

The site uses YouTube’s privacy-enhanced `youtube-nocookie.com` embed domain.
Unlisted videos will not appear in YouTube search, but anyone with the link can
watch them. Private videos cannot be embedded for public visitors.
