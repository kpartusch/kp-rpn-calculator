import { EnterAction } from './enter-action';
import { CalculatorAction } from './models/calculator-action';
import { CalculatorContext } from './models/calculator-context';
import { Operand } from './models/operand';

describe('EnterAction', () => {
  let action: CalculatorAction;
  let context: CalculatorContext;
  let stack: Operand[];

  beforeEach(() => {
    stack = [];
    action = new EnterAction();
  });

  it('should push result onto stack', () => {
    context = new CalculatorContext('19', stack);

    action.execute(context);

    expect(context.stack).toEqual([<Operand>{ value: '19' }]);
  });

  it('should have reset', () => {
    context = new CalculatorContext('', stack);

    const actionResult = action.execute(context);

    expect(actionResult.resetResult).toBeFalsy();
    expect(actionResult.reset).toBeTruthy();
  });
});
