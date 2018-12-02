import { Response, Request, NextFunction } from 'express';

/**
 * GET /calculator
 * The calculator will process a payload with an array of strings. The strings can be
 * either operands (numbers) or operators.
 */
export function getResult(req: Request, res: Response) {
  return res.status(200).json({ data: 'Hello world'});
}
