import { Operand } from './operand';

export class CalculatorContext {
  public get result(): string {
    return this._result;
  }
  private readonly _result: string;

  public get stack(): Operand[] {
    return this._stack;
  }
  private _stack: Operand[];

  constructor(result: string, stack: Operand[]) {
    this._result = result;
    this._stack = stack;
  }

  public clearStack(): void {
    this._stack = [];
  }
}
