import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import { isValidAccessToken } from '../services/auth.service';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = (req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '')
    || req.body.token
    || req.query.token;

  try {
    if (!authToken) {
      throw new Error('Unauthorized')
    }

    const decodedToken = isValidAccessToken(authToken);
    const userModel = new UserModel();

    const user = await userModel.findByEmail(decodedToken.email)
    if (user) {
      req.body.user = user;
      next();
    } else {
      throw new Error('Unauthorized')
    }
  } catch (err) {
    res.status(401).json({
      error: {
        type: 'request_unauthorized',
        message: err.message,
        errors: [
          {
            message: err.message
          }
        ]
      }
    });
  }
}