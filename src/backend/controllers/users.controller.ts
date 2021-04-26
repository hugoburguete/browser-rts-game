import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';

export const get = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  await userModel.findByUsername(req.body.user.username)
    .then(response => res.json(response))
    .catch(err => res.status(404));
}

export const findById = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  await userModel.findById(req.params.userId)
    .then(response => res.json(response))
    .catch(() => res.status(404));
}
