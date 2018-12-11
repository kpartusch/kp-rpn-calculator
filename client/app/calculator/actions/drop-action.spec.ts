import { DropAction } from './drop-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';

describe('DropAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new DropAction();
  });

  it('should remove result and shift down stack when stack has entries', () => {
    const currentResult = '56';
    const firstOperand = <Operand>{ value: '20' };
    stack.push(firstOperand);
    context = new CalculatorContext(currentResult, stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(firstOperand.value);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });

  it('should reset result to default when stack empty', () => {
    context = new CalculatorContext('56', stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(undefined);
    expect(actionResult.reset).toBe(true);
    expect(actionResult.resetResult).toBe(true);
    expect(context.stack.length).toBe(0);
  });
});
