import { CalculatorContext } from './calculator-context';
import { Operand } from './operand';

describe('CalculatorContext', () => {
  it('should clear stack', () => {
    const stack = [<Operand>{value: '48'}];
    const context = new CalculatorContext('23', stack);

    context.clearStack();

    expect(context.stack.length).toBe(0);
  });
});
