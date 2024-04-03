import express, { type Request, type Response } from 'express'
import db from './database'

const app = express()
const port = 3000

app.get('/users', async (req: Request, res: git pullResponse) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send('An error occurred')
  }
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
