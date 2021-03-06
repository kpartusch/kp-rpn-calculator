import { SwapAction } from './swap-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';
import { CalculatorContextBuilder } from '../models/calculator-context.builder';

describe('SwapAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new SwapAction();
  });

  it('should have result and first stack value swapped when length greater than zero', () => {
    const expectedResult = '56';
    const expectedOperand = <Operand>{ value: '19' };
    stack.push(<Operand>{ value: expectedResult });
    context = new CalculatorContextBuilder().setResult(expectedOperand.value).setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(1);
    expect(context.stack[0]).toEqual(expectedOperand);
  });

  it('should have default result when stack empty', () => {
    context = new CalculatorContextBuilder().setResult('19').setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(undefined);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });
});
