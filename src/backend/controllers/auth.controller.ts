import { Request, Response } from 'express';
import Bcrypt from "bcrypt";
import { User } from '../entities/user.entity';
import UserModel from '../models/user.model';
import { generateTokenForUser } from '../services/auth.service';
import { VillageModel } from '../models/village.model';
import { createVillage } from '../entities/village.entity';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  const villageModel = new VillageModel('1');

  try {
    // Verify the user is not already stored on the database
    const existingUserRequest = await userModel.findByEmail(req.body.email);
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

    // Create a new user
    const user: User = {
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, SALT_ROUNDS),
    };
    const newUserRequest = await userModel.create(user);
    const newUser = newUserRequest.insertedItem;

    if (newUser._id == null) {
      throw new Error("Error creating new user.");
    }

    // Create the users first village
    const newVillage = createVillage(newUser._id);
    await villageModel.create(newVillage);

    // Generate authentication tokens
    const response = generateTokenForUser(newUser);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error: {
        type: 'request_failed',
        message: "We were not able to register you at this moment. Please try again later.",
        errors: [
          {
            message: err.message,
          }
        ]
      }
    });
  }
}

export const login = async (req: Request, res: Response) => {
  // Check if the user exists
  const userModel = new UserModel();
  try {
    const user = await userModel.findByEmail(req.body.email);

    if (!user || !Bcrypt.compareSync(req.body.password, user.password || '')) {
      throw new Error("The credentials you've submitted do not match our records. Please try again.");
    }

    const response = generateTokenForUser(user);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error: {
        type: 'request_failed',
        message: err.message,
        errors: [
          {
            message: err.message,
          }
        ]
      }
    });
  }
}