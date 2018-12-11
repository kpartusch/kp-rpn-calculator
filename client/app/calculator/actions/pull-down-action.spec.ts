import { PullDownAction } from './pull-down-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';

describe('PullDownAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new PullDownAction();
  });

  it('should rotate stack entries down when stack has entries', () => {
    const expectedResult = '56';
    const expectedFirstOperand = <Operand>{ value: '19' };
    const expectedSecondOperand = <Operand>{ value: '20' };
    stack.push(expectedSecondOperand);
    stack.push(<Operand>{ value: expectedResult });
    context = new CalculatorContext(expectedFirstOperand.value, stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(2);
    expect(context.stack[0]).toEqual(expectedFirstOperand);
    expect(context.stack[1]).toEqual(expectedSecondOperand);
  });

  it('should rotate stack entries down when stack empty', () => {
    const expectedResult = '56';
    context = new CalculatorContext(expectedResult, stack);

    const actionResult = action.execute(context);

    expect(actionResult.result).toBe(expectedResult);
    expect(actionResult.reset).toBe(false);
    expect(actionResult.resetResult).toBe(false);
    expect(context.stack.length).toBe(0);
  });
});
