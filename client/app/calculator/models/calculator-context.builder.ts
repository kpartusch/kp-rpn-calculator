import { Operand } from './operand';
import { CalculatorContext } from './calculator-context';

export class CalculatorContextBuilder {
  private _result = '0';
  private _stack: Operand[] = [];

  public setResult(result: string): CalculatorContextBuilder {
    this._result = result;
    return this;
  }

  public setStack(stack: Operand[]): CalculatorContextBuilder {
    this._stack = stack;
    return this;
  }

  public build(): CalculatorContext {
    return new CalculatorContext(this._result, this._stack);
  }
}
