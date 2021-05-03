import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';

export const get = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  const user = await userModel.findByEmail(req.body.user.email);
  if (user) {
    // @todo We shouldn't be sending the whole user through. Create a user profile collection to differentiate it from
    // an authentication user entity
    res.status(200).json(user);
  } else {
    res.status(401).json({
      error: {
        type: 'request_unauthorized',
        message: "Unauthorized",
        errors: [
          {
            message: "Unauthorized"
          }
        ]
      }
    });
  }
}

export const findById = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  await userModel.findById(req.params.userId)
    .then(response => res.json(response))
    .catch(() => res.status(404));
}
