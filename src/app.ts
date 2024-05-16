import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from './utils/database';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


