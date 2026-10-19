import { NextResponse } from 'next/server'
import { getSpotifyAccessToken } from 'app/lib/spotify'

export const dynamic = 'force-static'

export async function GET() {
  const accessToken = await getSpotifyAccessToken()
  if (!accessToken) return NextResponse.json({ isConfigured: false })

  const headers = { Authorization: `Bearer ${accessToken}` }
  const [artistsResponse, tracksResponse] = await Promise.all([
    fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term', {
      headers,
      cache: 'no-store',
    }),
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
      headers,
      cache: 'no-store',
    }),
  ])

  if (!artistsResponse.ok || !tracksResponse.ok) {
    throw new Error('Spotify listening history request failed')
  }

  const artists = await artistsResponse.json()
  const tracks = await tracksResponse.json()

  return NextResponse.json({
    isConfigured: true,
    artists: artists.items.map((artist: { name: string; external_urls: { spotify: string } }) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
    songs: tracks.items.map((item: { track: { name: string; artists: { name: string }[]; external_urls: { spotify: string } } }) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
      url: item.track.external_urls.spotify,
    })),
  })
}
