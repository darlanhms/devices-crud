import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

interface MiddlewareFn {
  (req: Request, res: Response, next: NextFunction): Response | void;
}

export default function validateRequest(schema: Joi.ObjectSchema): MiddlewareFn {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    req.body = value;

    return next();
  };
}
