import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Auth, Token } from '../../types/auth';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

export const generateToken = (user: Auth): string => {
  const tokenData: Token = {
    userId: user.id,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  };

  return jwt.sign(tokenData, jwtSecret);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const verifyToken = async (token: string): Promise<any> => jwt.verify(token, jwtSecret);
  