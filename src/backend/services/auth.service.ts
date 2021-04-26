import { sign, verify } from 'jsonwebtoken';
import { User } from '../../common/entities/user.entity';

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JWTSignature {
  userId: string;
  username: string;
}

export const generateTokenForUser = (user: User) => {
  const authSecretKey = process.env.AUTH_SECRET_KEY || '';
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY || '';

  const data: JWTSignature = {
    userId: user._id || '',
    username: user.username,
  }

  const expiry = 3600;
  const token = sign(data, authSecretKey, { expiresIn: expiry });
  const refreshToken = sign(data, refreshSecretKey, { expiresIn: 7200 });

  const response: AuthenticationResponse = {
    accessToken: token,
    refreshToken: refreshToken,
    expiresIn: expiry
  }
  return response;
}

/**
 * 
 * @param accessToken 
 * @param user 
 * @returns 
 */
export const isValidToken = (accessToken: string): JWTSignature => {
  const authSecretKey = process.env.AUTH_SECRET_KEY || '';
  const decoded = verify(accessToken, authSecretKey) as JWTSignature;

  return decoded;
}