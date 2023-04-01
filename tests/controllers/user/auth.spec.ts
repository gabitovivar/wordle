import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
import { hashPassword, comparePassword, verifyToken, generateToken } from '../../../src/server/controllers/auth/auth';



describe('Auth Functions', () => {
  beforeAll(()=>{
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const hashedPassword = await hashPassword('testpassword');
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword.length).toBeGreaterThan(0);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const hashedPassword = await hashPassword('testpassword');
      const passwordMatch = await comparePassword('testpassword', hashedPassword);
      expect(passwordMatch).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const hashedPassword = await hashPassword('testpassword');
      const passwordMatch = await comparePassword('wrongpassword', hashedPassword);
      expect(passwordMatch).toBe(false);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', async () => {
      const token = jwt.sign({ id: '123' }, process.env.JWT_SECRET as string);
      const decoded = await verifyToken(token);
      expect(decoded).toBeDefined();
      // expect(decoded.id).toBe('123');
    });

    it('should reject an invalid token', async () => {
      const token = 'invalidtoken';
      await expect(verifyToken(token)).rejects.toThrow();
    });
  });

  describe('generateToken', () => {
    const user = { id: '123', email: 'test@example.com', password: '12345' };
    
    it('should generate a valid token with default options', async () => {
      const token = await generateToken(user);
      expect(token).toBeDefined();
  
      // Verificar que el token es un string válido
      expect(typeof token).toBe('string');
  
      // Verificar que el token es válido
      // const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      // expect(decodedToken).toBeDefined();
      // expect(decodedToken.id).toBe(user.id);
      // expect(decodedToken.email).toBe(user.email);
    });
  });
});