import { Request, Response } from 'express';
import {generateToken, hashPassword, comparePassword } from './auth';
import AuthModel from '../../models/auth';

const auth = new AuthModel();
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await auth.getUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    await auth.create(email,hashedPassword);
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await auth.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
        
        