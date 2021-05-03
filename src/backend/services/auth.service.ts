import { sign, verify } from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { AuthenticationResponse } from "../../common/entities/auth.entity";

export interface JWTSignature {
  userId: string;
  email: string;
}

export const generateTokenForUser = (user: User) => {
  const authSecretKey = process.env.AUTH_SECRET_KEY || '';
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY || '';

  const data: JWTSignature = {
    userId: user._id || '',
    email: user.email || '',
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
export const isValidAccessToken = (accessToken: string): JWTSignature => {
  const authSecretKey = process.env.AUTH_SECRET_KEY || '';
  const decoded = verify(accessToken, authSecretKey) as JWTSignature;

  return decoded;
}

/**
 * 
 * @param accessToken 
 * @param user 
 * @returns 
 */
export const verifyRefreshToken = (refreshToken: string): JWTSignature => {
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY || '';
  const decoded = verify(refreshToken, refreshSecretKey) as JWTSignature;

  return decoded;
}
