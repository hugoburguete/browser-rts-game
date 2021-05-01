import express, { Express, NextFunction, Request, Response } from "express";
import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import routes from './routes';
import dotenv from "dotenv";

const dotenvConfig = process.env.JEST_WORKER_ID !== undefined ? { path: path.resolve('.env.testing') } : {};
dotenv.config(dotenvConfig);

export const createServer = (): Promise<Express> => {
  // Init
  const app = express();

  // Express setup

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const validatorOptions = {
    apiSpec: path.resolve('./src/backend/openapi.yml'),
    validateRequests: true,
    validateResponses: true
  }
  app.use(OpenApiValidator.middleware(validatorOptions))

  // Routing
  app.use('/', routes);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('*', (req: Request, res: Response) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

  // Error handling
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      error: {
        type: 'request_validation',
        message: err.message,
        errors: err.errors
      }
    });
  });

  return Promise.resolve(app);
}