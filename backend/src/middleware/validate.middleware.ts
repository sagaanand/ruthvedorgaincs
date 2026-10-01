import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { UnprocessableEntityError } from '../utils/errors.js';

export function validate(schema: AnyZodObject, target?: 'body' | 'query' | 'params') {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (target) {
        const parsed = await schema.parseAsync(req[target]);
        req[target] = parsed;
      } else {
        const shape = (schema as any).shape;
        if (shape && (shape.body || shape.query || shape.params)) {
          const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
          });
          req.body = parsed.body ?? req.body;
          req.query = parsed.query ?? req.query;
          req.params = parsed.params ?? req.params;
        } else {
          // If schema is a flat object and method is GET, parse query; else parse body
          const key = req.method === 'GET' ? 'query' : 'body';
          const parsed = await schema.parseAsync(req[key]);
          req[key] = parsed;
        }
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.').replace(/^(body|query|params)\./, ''),
          message: err.message,
        }));
        next(new UnprocessableEntityError('Validation failed', formattedErrors));
      } else {
        next(error);
      }
    }
  };
}
