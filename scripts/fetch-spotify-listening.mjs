import { mkdir, writeFile } from 'node:fs/promises'
import process from 'node:process'

const outputPath = 'public/spotify/listening.json'
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'

async function writeSummary(summary) {
  await mkdir('public/spotify', { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`)
}

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret, SPOTIFY_REFRESH_TOKEN: refreshToken } =
  process.env

if (!clientId || !clientSecret || !refreshToken) {
  console.warn('Spotify secrets are not configured; publishing an empty listening summary.')
  await writeSummary({ isConfigured: false })
  process.exit(0)
}

const tokenResponse = await fetch(spotifyTokenUrl, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }),
})

if (!tokenResponse.ok) {
  throw new Error(`Spotify token request failed with status ${tokenResponse.status}`)
}

const { access_token: accessToken } = await tokenResponse.json()
const headers = { Authorization: `Bearer ${accessToken}` }
const [artistsResponse, tracksResponse] = await Promise.all([
  fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term', { headers }),
  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', { headers }),
])

if (!artistsResponse.ok || !tracksResponse.ok) {
  throw new Error(
    `Spotify listening history request failed with statuses ${artistsResponse.status} and ${tracksResponse.status}`
  )
}

const artists = await artistsResponse.json()
const tracks = await tracksResponse.json()

await writeSummary({
  isConfigured: true,
  artists: artists.items.map((artist) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
  })),
  songs: tracks.items.map((item) => ({
    title: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(', '),
    url: item.track.external_urls.spotify,
  })),
})

console.log(`Wrote Spotify listening summary to ${outputPath}`)
