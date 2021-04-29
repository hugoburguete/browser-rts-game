import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';
import { generateTokenForUser } from '../services/auth.service';
import { ErrorBag, validate } from '../services/validator.service';

export const register = async (req: Request, res: Response) => {
  // Validate the request
  const errorBag = new ErrorBag([
    validate(req.body.email, 'Email').isString().isValidEmailAddress(),
    validate(req.body.username, 'Username').isString().isLongerThan(5).isShorterThan(24),
    validate(req.body.password, 'Password').isString().isLongerThan(5).isShorterThan(24),
  ]);

  if (errorBag.hasErrors()) {
    res.status(422).json(errorBag.errors);
  }

  // Map the data
  const user: User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Create a new user
  const userModel = new UserModel();
  await userModel.create(user)
    .then(dbResponse => {
      const newUser = dbResponse.insertedItem;

      // Generate authentication tokens
      const response = generateTokenForUser(newUser);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.send('error')
    });
}

export const login = async (req: Request, res: Response) => {
  // Validate the request
  // @todo

  // Check if the user exists
  const userModel = new UserModel();
  userModel.findByEmail(req.body.email)
    .then(user => {
      if (!user) {
        throw new Error("Can't find user with that email");
      }

      const response = generateTokenForUser(user);
      res.json(response);

      // Confirm the token is correct
      // const decoded = jwt.verify(req.body.token, authSecretKey) as any;
      // if (decoded.username !== user.username) {
      //   throw Error('nope');
      // }


    })
    .catch(err => {
      console.log(err)
      res.send('error')
    });
}