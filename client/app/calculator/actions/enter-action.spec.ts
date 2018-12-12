import { EnterAction } from './enter-action';
import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { Operand } from '../models/operand';
import { CalculatorContextBuilder } from '../models/calculator-context.builder';

describe('EnterAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new EnterAction();
  });

  it('should push result onto stack', () => {
    context = new CalculatorContextBuilder().setResult('19').setStack(stack).build();

    action.execute(context);

    expect(context.stack).toEqual([<Operand>{ value: '19' }]);
  });

  it('should have reset', () => {
    context = new CalculatorContextBuilder().setStack(stack).build();

    const actionResult = action.execute(context);

    expect(actionResult.resetResult).toBeFalsy();
    expect(actionResult.reset).toBeTruthy();
  });
});
