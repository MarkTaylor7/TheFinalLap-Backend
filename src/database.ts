import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  database: 'the-final-lap-db',
  password: 'ferrariRed2007'
})

export default pool
