import { Request, Response } from 'express';
import Bcrypt from "bcrypt";
import { RefreshToken, User } from '../entities/user.entity';
import UserModel from '../models/user.model';
import { generateTokenForUser, verifyRefreshToken } from '../services/auth.service';
import { VillageModel } from '../models/village.model';
import { createVillage } from '../entities/village.entity';
import RefreshTokenModel from '../models/refreshtoken.model';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  const villageModel = new VillageModel('1');
  const refreshTokenModel = new RefreshTokenModel();

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

    // Store refresh token
    let refreshTokenExpiry = new Date();
    refreshTokenExpiry.setSeconds(refreshTokenExpiry.getSeconds() + 7200)
    const refreshToken: RefreshToken = {
      created: new Date(),
      createdByIp: req.ip,
      expires: refreshTokenExpiry,
      token: response.refreshToken,
      userId: user._id || '',
      replacedByToken: undefined,
      revoked: undefined,
      revokedByIp: undefined,
    };
    refreshTokenModel.createOrUpdate(refreshToken);

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
  const userModel = new UserModel();
  const refreshTokenModel = new RefreshTokenModel();
  try {
    // Check if the user exists
    const user = await userModel.findByEmail(req.body.email);

    if (!user || !Bcrypt.compareSync(req.body.password, user.password || '')) {
      throw new Error("The credentials you've submitted do not match our records. Please try again.");
    }

    const response = generateTokenForUser(user);

    // Store refresh token
    let refreshTokenExpiry = new Date();
    refreshTokenExpiry.setSeconds(refreshTokenExpiry.getSeconds() + 7200)
    const refreshToken: RefreshToken = {
      created: new Date(),
      createdByIp: req.ip,
      expires: refreshTokenExpiry,
      token: response.refreshToken,
      userId: user._id || '',
      replacedByToken: undefined,
      revoked: undefined,
      revokedByIp: undefined,
    };
    refreshTokenModel.createOrUpdate(refreshToken);

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

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  const refreshTokenModel = new RefreshTokenModel();
  const userModel = new UserModel();

  try {
    // Find the token and user of the token
    const decoded = verifyRefreshToken(token);
    const refreshToken: RefreshToken = await refreshTokenModel.findByToken(token);
    const user = await userModel.findById(decoded.userId);
    console.log(decoded, user);

    if (user == null) {
      throw new Error("Invalid token");
    }

    // Generate new token
    const response = generateTokenForUser(user);

    // Store the token record
    refreshToken.revoked = new Date();
    refreshToken.revokedByIp = req.ip;
    refreshToken.replacedByToken = response.refreshToken;
    await refreshTokenModel.update(refreshToken);

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