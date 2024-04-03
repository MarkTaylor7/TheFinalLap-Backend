import Joi from 'joi'

export interface Book {
  ISBN: number
  title: string
  author: string
}

const BookSchema = Joi.object<Book>({
  ISBN: Joi.number().required(),
  title: Joi.string().required(),
  author: Joi.string().required()
})

export const validateBook = (book: any): Book | null => {
  const { error, value } = BookSchema.validate(book)
  if (error !== undefined) {
    return null
  }
  return value
}
