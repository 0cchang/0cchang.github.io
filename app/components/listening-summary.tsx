'use client'

import { useEffect, useState } from 'react'

type ListeningSummary = {
  isConfigured: boolean
  artists?: { name: string; url: string }[]
  songs?: { title: string; artist: string; url: string }[]
}

export function ListeningSummary() {
  const [summary, setSummary] = useState<ListeningSummary | null>(null)

  useEffect(() => {
    fetch('/api/spotify/listening')
      .then((response) => {
        if (!response.ok) throw new Error(`Listening request failed with status ${response.status}`)
        return response.json() as Promise<ListeningSummary>
      })
      .then(setSummary)
      .catch(() => setSummary({ isConfigured: false }))
  }, [])

  if (!summary || summary.isConfigured === false) return null

  return (
    <section>
      <h2 className="mb-5 border-b border-neutral-200 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        What I&apos;ve been listening to
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium">Top artists</p>
          <ol className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            {summary.artists?.map((artist, index) => (
              <li key={artist.url}>
                <a href={artist.url} target="_blank" rel="noreferrer" className="hover:underline">
                  <span className="mr-3 text-neutral-400">{index + 1}</span>{artist.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Recently played</p>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            {summary.songs?.map((song) => (
              <li key={`${song.url}-${song.title}`}>
                <a href={song.url} target="_blank" rel="noreferrer" className="block hover:underline">
                  <span className="block truncate">{song.title}</span>
                  <span className="block truncate text-neutral-400">{song.artist}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
