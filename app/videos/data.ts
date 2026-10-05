export type Video = {
  title: string
  description: string
  youtubeId: string
  publishedAt?: string
}

// Add the ID from each video's youtube.com/watch?v=... URL here.
export const videos: Video[] = [
  {
    title: '385 squat',
    description: 'Trying to get 405 by the end of the semester.',
    youtubeId: 'IprbMz48H5Y',
  },
]
