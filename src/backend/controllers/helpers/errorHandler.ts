import { Response } from 'express';
import HTTPError from '../exceptions/HTTPError';

export const handleError = (err: Error, res: Response) => {
  console.log(err);
  if (err instanceof HTTPError) {
    console.log(err.response.status, err.response.error);
    res.send(err.response.status).send(err.response.error);
  } else {
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