import { NegateAction } from './negate-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';

describe('NegateAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new NegateAction();
  });

  it('should negate result when result positive', () => {
    const expectedResult = -56;
    context = new CalculatorContext((expectedResult * -1).toString(), stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult.toString());
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });

  it('should negate result when result negative', () => {
    const expectedResult = 56;
    context = new CalculatorContext((expectedResult * -1).toString(), stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult.toString());
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });
});
