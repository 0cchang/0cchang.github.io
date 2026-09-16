'use client'

import { useEffect, useState } from 'react'

type NowPlaying = {
  isConfigured: boolean
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string | null
  songUrl?: string
}

export function NowPlaying() {
  const [track, setTrack] = useState<NowPlaying | null>(null)

  useEffect(() => {
    let active = true

    async function loadTrack() {
      const response = await fetch('/api/spotify/now-playing')
      if (!response.ok) {
        throw new Error(`Now playing request failed with status ${response.status}`)
      }
      const data = (await response.json()) as NowPlaying
      if (active) setTrack(data)
    }

    loadTrack().catch(() => {
      if (active) setTrack({ isConfigured: true, isPlaying: false })
    })

    const interval = window.setInterval(loadTrack, 30_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  if (!track || !track.isPlaying) {
    return (
      <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-sm font-medium">Currently listening</p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {track?.isConfigured === false
            ? 'Connect Spotify to share what I am listening to.'
            : 'Nothing playing right now.'}
        </p>
      </div>
    )
  }

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={`Album artwork for ${track.album}`}
          className="h-16 w-16 rounded object-cover"
        />
      )}
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Currently listening</p>
        <p className="mt-1 truncate font-medium">{track.title}</p>
        <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">{track.artist}</p>
        <p className="truncate text-xs text-neutral-500">{track.album}</p>
      </div>
    </a>
  )
}
