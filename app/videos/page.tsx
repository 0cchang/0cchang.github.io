import { videos } from './data'

export const metadata = {
  title: 'Videos',
  description: 'Videos by Caleb Chang.',
}

export default function VideosPage() {
  return (
    <section>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight">Videos</h1>
      <p className="mb-8 max-w-2xl text-neutral-600 dark:text-neutral-300">
        A collection of videos, talks, and demos.
      </p>

      {videos.length > 0 ? (
        <div className="space-y-10">
          {videos.map((video) => (
            <article key={video.youtubeId} className="space-y-3">
              <div className="aspect-video overflow-hidden rounded-lg border border-neutral-200 bg-black dark:border-neutral-800">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div>
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <h2 className="font-medium">{video.title}</h2>
                  {video.publishedAt ? (
                    <p className="text-sm text-neutral-500">{video.publishedAt}</p>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
          <h2 className="font-medium">Videos are coming soon</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            Upload a video to YouTube, set its visibility to public or unlisted,
            then add its video ID to{' '}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-900">
              app/videos/data.ts
            </code>
            .
          </p>
        </div>
      )}
    </section>
  )
}
