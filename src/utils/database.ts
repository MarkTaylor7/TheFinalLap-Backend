import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOSTNAME,
  user: process.env.DATABASEUSERNAME,
  database: 'f1_database',
  password: process.env.PASSWORD
})

console.log(process.env.HOSTNAME)
console.log(process.env.DATABASEUSERNAME)

export default pool
