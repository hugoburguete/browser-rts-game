import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';
import { generateTokenForUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  // Map the data
  const user: User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // Create a new user
  const userModel = new UserModel();
  try {
    const existingUserRequest = userModel.findByEmail(req.body.username);
    if (existingUserRequest) {
      res.status(500).json({
        error: {
          type: 'request_validation',
          message: "The user you're trying to create already exists.",
          errors: [
            {
              message: "The user you're trying to create already exists."
            }
          ]
        }
      });
    }

    const newUserRequest = await userModel.create(user);
    const newUser = newUserRequest.insertedItem;

    // Generate authentication tokens
    const response = generateTokenForUser(newUser);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
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