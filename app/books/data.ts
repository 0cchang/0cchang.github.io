export type Book = {
  title: string
  author: string
  status: 'Reading' | 'Read'
  note: string
  chapters: { title: string; notes: string }[]
}

export const books: Book[] = [
  {
    title: 'The Art of Doing Science and Engineering',
    author: 'Richard Hamming',
    status: 'Reading',
    note: 'Richard Hamming’s reflections on solving important problems, doing creative work, and becoming a better technical thinker.',
    chapters: [
      { title: 'Chapter 1', notes: 'Add notes as you read.' },
      { title: 'Chapter 2', notes: 'Add notes as you read.' },
    ],
  },
]
