import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Operand } from './models/operand';
import { CalculatorContext } from './models/calculator-context';
import { CalculatorAction } from './models/calculator-action';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  private isFirstOperand = true;
  private operandStack: BehaviorSubject<Operand[]> = new BehaviorSubject<Operand[]>([]);

  public get result() {
    return this._result;
  }
  private _result = '0';

  public stack$: Observable<Operand[]> = this.operandStack.asObservable();

  public get hasResult(): boolean {
    return +this._result !== 0;
  }

  constructor() { }

  ngOnInit() {
  }

  public processOperand(value: string): void {
    if (value === '0') {
      return;
    }

    if (this.isFirstOperand) {
      this._result = value;
      this.isFirstOperand = false;
      return;
    }

    this._result = this._result.concat(value);
  }

  public processAction(action: CalculatorAction): void {
    const context = new CalculatorContext(this._result, Object.assign([], this.operandStack.getValue()));
    const actionResult = action.execute(context);

    this.operandStack.next(Object.assign([], context.stack));

    if (actionResult.result) {
      this._result = actionResult.result;
    }

    if (actionResult.reset) {
      this.resetResult(actionResult.resetResult);
    }
  }

  private resetResult(resetResultValue: boolean = true) {
    if (resetResultValue) {
      this._result = '0';
    }
    this.isFirstOperand = true;
  }

}
