import { Response, Request, NextFunction } from 'express';

/**
 * POST /calculator
 * The calculator will accept a payload with an array of strings. The strings can be
 * either operands (numbers) or operators.
 */
export function postCalculatorResult(req: Request, res: Response) {
  const inputs = <string[]>req.body.inputs;
  const stack: number[] = [];
  inputs.forEach((value) => {
    if (value === '%') {
      // percentage functions do not cause stack drop
      const operand_x = stack.pop();
      let percentageResult = evaluate(operand_x, null, value);
      if (stack.length > 0) {
        const operand_y = stack[stack.length - 1];
        percentageResult = operand_y * percentageResult;
      }
      stack.push(percentageResult);
    } else if (['+', '-', '*', '/'].includes(value)) {
      // two number functions cause stack drop
      const operand_x = stack.pop();
      const operand_y = stack.pop();
      const twoNumberResult = evaluate(operand_y, operand_x, value);
      if (isNaN(twoNumberResult)) {
        return res.status(422).json({ errors: [ { message: 'inputs provided do not represent a valid postfix (RPN) expression' }]});
      }
      stack.push(evaluate(operand_y, operand_x, value));
    } else if (!isNaN(+value)) {
      stack.push(+value);
    }
  });

  const result = stack.length === 0 ? 0 : stack.pop();
  res.status(200).json({ 'data': result });
}

function evaluate(leftOperand: number, rightOperand: number, operator: string): number {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
    case '%':
      return leftOperand / 100;
  }
}
