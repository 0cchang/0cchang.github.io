export type Book = {
  title: string
  author: string
  status: 'Reading' | 'Read'
  note: string
  chapters: { title: string; notes: string }[]
}

export const books: Book[] = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'Reading',
    note: 'Distributed systems, reliability, and the trade-offs behind modern data platforms.',
    chapters: [
      { title: 'Chapter 1: Reliable, Scalable, and Maintainable Applications', notes: 'Add notes as you read.' },
      { title: 'Chapter 2: Data Models and Query Languages', notes: 'Add notes as you read.' },
    ],
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas and Andrew Hunt',
    status: 'Read',
    note: 'Notes on building software deliberately, communicating clearly, and improving continuously.',
    chapters: [
      { title: 'Chapter 1: A Pragmatic Philosophy', notes: 'Add notes from this chapter.' },
      { title: 'Chapter 2: A Pragmatic Approach', notes: 'Add notes from this chapter.' },
    ],
  },
]
