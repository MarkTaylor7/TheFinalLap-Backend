import bcrypt from 'bcryptjs';
import pool from '../utils/database';
import jwt from 'jsonwebtoken';
import { Router, type Request, type Response } from 'express'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const [result] = await pool.execute(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "User registration failed" });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.execute<any[]>(`SELECT * FROM users WHERE username = ?`, [username]);

    if (users.length > 0) {
      const userValid = await bcrypt.compare(password, users[0].password);

      if (userValid) {
        const token = jwt.sign({ id: users[0].id }, 'your_jwt_secret', { expiresIn: '24h' });
        res.status(200).send({ message: "Login successful!", token });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Authentication failed" });
  }
});

export default router