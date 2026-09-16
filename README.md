# Portfolio Blog Starter

This is a porfolio site template complete with a blog. Includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

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

### Spotify currently playing

The homepage can show the track currently playing on your Spotify account. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), then add these values to a local `.env.local` file:

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
