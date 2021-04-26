import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';

const users: User[] = [
  {
    username: "testuser",
    email: "testuser@test.com",
    password: "testtest"
  }
];

export const get = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  await userModel.findByUsername(users[0].username)
    .then(response => res.send(response))
    .catch(err => res.send('error'));
}

export const post = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  await userModel.create(users[0])
    .then(response => res.send(response))
    .catch(err => res.send('error'));
}