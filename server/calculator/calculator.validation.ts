import { body } from 'express-validator/check';

export function validateGetCalculatorResult() {
  return [
    body('inputs').isArray().withMessage('must be an array'),
    body('inputs.*').matches(/[0-9.+\-\/*%]/).withMessage('must be a number or operator')
  ];
}
