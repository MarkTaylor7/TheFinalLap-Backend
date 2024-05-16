import express from 'express'
import { userRouter, bookRouter, authRouter } from './api'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT ?? 5001

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)
app.use('/api/authentication', authRouter)

app.use(cookieParser());

/**
 * Exercise:
 * Implement a new data model and corresponding API. At the end of the day you should
 * create a model that interests you, and progresses your project in some way, but if
 * you can't think of anything, try creating a model for a collection of books which
 * may have the following properties:
 *  - ISBN
 *  - title
 *  - author
 *  - etc...
 * and lives at /api/book
 *
 * Whatever you decide be sure to implement the full set of POST, GET, PUT, and DELETE
 * operations assuming that makes sense in your case.
 */

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
