import { CalculatorContext } from './calculator-context';
import { Operand } from './operand';
import { CalculatorContextBuilder } from './calculator-context.builder';

describe('CalculatorContext', () => {
  it('should clear stack', () => {
    const stack = [<Operand>{value: '48'}];
    const context = new CalculatorContextBuilder().setResult('23').setStack(stack).build();

    context.clearStack();

    expect(context.stack.length).toBe(0);
  });
});
