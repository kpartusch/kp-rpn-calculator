import { FractionAction } from './fraction-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';
import { CalculatorContextBuilder } from '../models/calculator-context.builder';

describe('FractionAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new FractionAction();
  });

  it('should change result to fraction when whole number', () => {
    const result = '56';
    const expectedResult = `${result}.`;
    context = new CalculatorContextBuilder()
      .setResult(result)
      .setStack(stack)
      .build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });

  it('should do nothing to result when already fraction', () => {
    const expectedResult = '56.43';
    context = new CalculatorContext(expectedResult, stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });
});
