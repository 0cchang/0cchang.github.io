import Link from 'next/link'
import { books } from './data'

export const metadata = {
  title: 'Books',
  description: 'Books I am reading and reading diaries.',
}

export default function BooksPage() {
  return (
    <section>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight">Books</h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-300">
        Reading notes for each chapter of the book I am currently reading.
      </p>
      <div className="space-y-5">
        {books.map((book) => (
          <Link key={book.title} href={`/books/${book.title.toLowerCase().replaceAll(' ', '-')}`} className="block border-b border-neutral-200 pb-5 dark:border-neutral-800">
            <div className="flex justify-between gap-4">
              <h2 className="font-medium">{book.title}</h2>
              <span className="text-sm text-neutral-500">{book.status}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">{book.author}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
