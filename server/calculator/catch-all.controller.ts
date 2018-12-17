import { Response, Request, NextFunction } from 'express';

/**
 * ALL /*
 * The calculator API will return not found for all requests not matching a configured route
 */

export function notFound(req: Request, res: Response) {
  res.status(404).json({errors: [{message: 'Not Found'}]});
}

/**
 * GET /
 * The calculator API will return a description of how to use API when making a GET request
 * to the root path.
 */

export function home(req: Request, res: Response) {
  res.status(200).json({data: {
    title: 'Reverse Polish Notation Calculator.',
    description: 'This calculator API uses reverse polish notation. You can submit a POST ' +
        'request to "/api/calculation" with an array of string inputs. The response will contain ' +
        'either a response or list of errors.'}});
}
