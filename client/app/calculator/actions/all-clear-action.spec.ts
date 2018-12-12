import { AllClearAction } from './all-clear-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';
import { CalculatorContextBuilder } from '../models/calculator-context.builder';

describe('AllClearAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new AllClearAction();
  });

  it('should clear stack when no result', () => {
    const defaultResult = '0';
    const firstOperand = <Operand>{ value: '20' };
    stack.push(firstOperand);
    context = new CalculatorContextBuilder().setResult(defaultResult).setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(defaultResult);
    expect(actionResult.reset).toBe(true);
    expect(actionResult.resetResult).toBe(true);
    expect(context.stack.length).toBe(0);
  });

  it('should reset result to default when result exists', () => {
    const defaultResult = '0';
    const firstOperand = <Operand>{ value: '20' };
    stack.push(firstOperand);
    context = new CalculatorContextBuilder().setResult('56').setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(defaultResult);
    expect(actionResult.reset).toBe(true);
    expect(actionResult.resetResult).toBe(true);
    expect(context.stack.length).toBe(1);
    expect(context.stack[0]).toEqual(firstOperand);
  });
});
