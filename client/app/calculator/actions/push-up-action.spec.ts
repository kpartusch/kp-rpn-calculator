import { PushUpAction } from './push-up-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';
import { CalculatorContextBuilder } from '../models/calculator-context.builder';

describe('PushUpAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new PushUpAction();
  });

  it('should rotate stack entries up when stack has entries', () => {
    const expectedResult = '56';
    const expectedFirstOperand = <Operand>{ value: '19' };
    const expectedSecondOperand = <Operand>{ value: '20' };
    stack.push(<Operand>{ value: expectedResult });
    stack.push(expectedFirstOperand);
    context = new CalculatorContextBuilder()
      .setResult(expectedSecondOperand.value)
      .setStack(stack)
      .build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(2);
    expect(context.stack[0]).toEqual(expectedFirstOperand);
    expect(context.stack[1]).toEqual(expectedSecondOperand);
  });

  it('should rotate stack entries up when stack empty', () => {
    const expectedResult = '56';
    context = new CalculatorContextBuilder().setResult(expectedResult).setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });
});
