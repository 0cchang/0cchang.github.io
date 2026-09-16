import { NextResponse } from 'next/server'

const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
const currentlyPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing'

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return null
  }

  const response = await fetch(spotifyTokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Spotify token request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.access_token as string
}

export async function GET() {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return NextResponse.json({ isConfigured: false, isPlaying: false })
  }

  const response = await fetch(currentlyPlayingUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })

  if (response.status === 204 || response.status === 202) {
    return NextResponse.json({ isConfigured: true, isPlaying: false })
  }

  if (!response.ok) {
    throw new Error(`Spotify currently playing request failed with status ${response.status}`)
  }

  const data = await response.json()
  const item = data.item

  if (!data.is_playing || !item) {
    return NextResponse.json({ isConfigured: true, isPlaying: false })
  }

  return NextResponse.json({
    isConfigured: true,
    isPlaying: true,
    title: item.name,
    artist: item.artists.map((artist: { name: string }) => artist.name).join(', '),
    album: item.album.name,
    albumImageUrl: item.album.images[0]?.url ?? null,
    songUrl: item.external_urls.spotify,
  })
}
