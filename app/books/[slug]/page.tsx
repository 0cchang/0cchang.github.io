import { notFound } from 'next/navigation'
import { books } from '../data'

export function generateStaticParams() {
  return books.map((book) => ({
    slug: book.title.toLowerCase().replaceAll(' ', '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = books.find((item) => item.title.toLowerCase().replaceAll(' ', '-') === slug)
  return book ? { title: book.title, description: `Reading diary for ${book.title}.` } : undefined
}

export default async function BookDiary({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = books.find((item) => item.title.toLowerCase().replaceAll(' ', '-') === slug)
  if (!book) notFound()

  return (
    <section>
      <p className="mb-2 text-sm text-neutral-500">{book.status} · {book.author}</p>
      <h1 className="text-3xl font-semibold tracking-tight">{book.title}</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">{book.note}</p>
      <div className="mt-10 space-y-8">
        {book.chapters.map((chapter) => (
          <article key={chapter.title} className="border-l-2 border-neutral-200 pl-5 dark:border-neutral-800">
            <h2 className="font-medium">{chapter.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{chapter.notes}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
