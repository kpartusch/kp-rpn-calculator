import { describe, it } from 'mocha';
import { validationResult } from 'express-validator/check';
import { validateGetCalculatorResult } from './calculator.validation';

async function testExpressValidatorMiddleware(req, res, middlewares) {
  await Promise.all(middlewares.map(async (middleware) => {
    await middleware(req, res, () => {
      return undefined;
    });
  }));
}

interface Request {
  body: any;
  params: any;
}

describe('Calculator Controller Validation', () => {
  let req: Request;
  let res: any;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {};
  });

  it('should be invalid when no inputs', () => {
    return testExpressValidatorMiddleware(req, res, validateGetCalculatorResult()).then(() => {
      const errors = validationResult(req);
      errors.isEmpty().should.be.false;
      errors.array().should.have.length(1);
      errors.array().should.have.deep.members([{ location: 'body', msg: 'must be an array', param: 'inputs', value: undefined }]);
    });
  });

  it('should be invalid when bad inputs', () => {
    req.body = { inputs: ['4.9', '3', '@']};
    return testExpressValidatorMiddleware(req, res, validateGetCalculatorResult()).then(() => {
      const errors = validationResult(req);
      errors.isEmpty().should.be.false;
      errors.array().should.have.length(1);
      errors.array().should.have.deep.members([{ location: 'body', msg: 'must be a number or operator', param: 'inputs[2]', value: '@' }]);
    });
  });

  it('should be valid when numbers and operators', () => {
    req.body = { inputs: ['4.9', '-3', '+', '57', '1268']};
    return testExpressValidatorMiddleware(req, res, validateGetCalculatorResult()).then(() => {
      const errors = validationResult(req);
      errors.isEmpty().should.be.true;
      errors.array().should.have.length(0);
    });
  });
});
