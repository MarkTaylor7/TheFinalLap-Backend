import { Router, type Request, type Response } from 'express'
import { error, success } from '../utils/rest'
import { type Book, validateBook } from '../models'

const router = Router()

const BOOK_COLLECTION: Book[] = []

BOOK_COLLECTION.push({
  ISBN: 113235,
  title: 'Dune',
  author: 'Frank Herbert'
})

router.post('/', (req: Request, res: Response) => {
  const book = validateBook(req.body)
  if (book === null) {
    return res.status(400).json(error('Book data is not formatted correctly'))
  }

  BOOK_COLLECTION.push(book)

  return res.status(200).json(success(book))
})

router.get('/:ISBN', (req: Request, res: Response) => {
  const isbn = parseInt(req.params.ISBN)
  if (Number.isNaN(isbn)) {
    return res.status(400).json(error('Invalid book ISBN'))
  }

  const book = BOOK_COLLECTION.find(b => b.ISBN === isbn)
  if (book === undefined) {
    return res.status(404).json(error('Book not found'))
  }

  return res.status(200).json(success(book))
})

router.put('/:ISBN', (req: Request, res: Response) => {
  const isbn = parseInt(req.params.ISBN)
  if (Number.isNaN(isbn)) {
    return res.status(400).json(error('Invalid book ISBN'))
  }

  const newBook = validateBook(req.body)
  if (newBook === null) {
    return res.status(400).json(error('Book data is not formatted correctly'))
  }

  const selectedBook = BOOK_COLLECTION.find(b => b.ISBN === isbn)
  if (selectedBook === undefined) {
    return res.status(404).json(error('Book not found'))
  }

  selectedBook.ISBN = newBook.ISBN
  selectedBook.title = newBook.title
  selectedBook.author = newBook.author

  return res.status(201).send()
})

router.delete('/:ISBN', (req: Request, res: Response) => {
  const isbn = parseInt(req.params.ISBN)
  if (Number.isNaN(isbn)) {
    return res.status(400).json(error('Invalid book ISBN'))
  }

  const index = BOOK_COLLECTION.findIndex(b => b.ISBN === isbn)
  if (index === -1) {
    return res.status(404).json(error('Book not found'))
  }

  BOOK_COLLECTION.splice(index, 1)

  return res.status(200).json(success('Book deleted successfully'))
})

export default router
