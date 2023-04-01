import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../controllers/auth/auth';

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded =  await verifyToken(token);
    req.body.auth = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};