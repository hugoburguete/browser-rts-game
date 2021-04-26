import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import { isValidToken } from '../services/auth.service';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authToken = (req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '')
    || req.body.token
    || req.query.token;

  if (!authToken) {
    throw new Error('Unauthenticated')
  }

  const decodedToken = isValidToken(authToken);
  const userModel = new UserModel();

  return userModel.findByUsername(decodedToken.username)
    .then(user => {
      if (user) {
        req.body.user = user;
        next();
      } else {
        res.status(401).json({ "error": "Unauthorized" });
      }
    })
}