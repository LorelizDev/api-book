import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return sign;
};

export const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};