import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Operand } from './models/operand';
import { CalculatorContext } from './models/calculator-context';
import { CalculatorAction } from './models/calculator-action';
import { CalculatorService } from './calculator.service';
import { Operator } from './models/operator.enum';

export type Operators = Operator.Plus | Operator.Minus | Operator.Multiply | Operator.Divide | Operator.Percent;
type TwoNumberOperators = Operator.Plus | Operator.Minus | Operator.Multiply | Operator.Divide;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  private _isFirstOperand = true;
  private _isFirstOperandAfterOperator = false;
  private _operandStack: BehaviorSubject<Operand[]> = new BehaviorSubject<Operand[]>([]);

  public get result(): string {
    return this._result;
  }
  private _result = '0';

  public stack$: Observable<Operand[]> = this._operandStack.asObservable();

  public get hasResult(): boolean {
    return +this._result !== 0;
  }

  constructor(private _calculatorService: CalculatorService) { }

  ngOnInit() {
  }

  public processOperand(value: string): void {
    if (value === '0' && this._isFirstOperand) {
      return;
    }

    if (this._isFirstOperandAfterOperator) {
      this._operandStack.getValue().push(<Operand>{value: this._result});
      this._result = value;
      this._isFirstOperandAfterOperator = false;
      return;
    }

    if (this._isFirstOperand) {
      this._result = value;
      this._isFirstOperand = false;
      return;
    }

    this._result = this._result.concat(value);
  }

  public processAction(action: CalculatorAction): void {
    const context = new CalculatorContext(this._result, Object.assign([], this._operandStack.getValue()));
    const actionResult = action.execute(context);

    this._operandStack.next(Object.assign([], context.stack));

    if (actionResult.result) {
      this._result = actionResult.result;
    }

    if (actionResult.reset) {
      this._resetResult(actionResult.resetResult);
    }
  }

  public processOperator(operator: Operators): void {
    operator === Operator.Percent ? this._processPercentOperator(operator) : this._processTwoNumberOperator(operator);
  }

  private _processPercentOperator(operator: Operator.Percent): void {
    if (!this.hasResult) {
      return;
    }

    const inputs = [];
    const stack = this._operandStack.getValue();
    if (stack.length > 0) {
      inputs.push(stack[stack.length - 1].value);
    }
    inputs.push(this.result);
    inputs.push(operator);
    this._runCalculation(inputs);
  }

  private _processTwoNumberOperator(operator: TwoNumberOperators): void {
    const stack = this._operandStack.getValue();
    if (stack.length < 1) {
      return;
    }

    const inputs = [];
    inputs.push(stack.pop().value);
    inputs.push(this.result);
    inputs.push(operator);
    this._runCalculation(inputs);
  }

  private _runCalculation(inputs) {
    this._calculatorService
      .postCalculation(inputs)
      .subscribe(result => {
        this._result = result.toString();
      });
    this._isFirstOperandAfterOperator = true;
  }

  private _resetResult(resetResultValue: boolean = true) {
    if (resetResultValue) {
      this._result = '0';
    }
    this._isFirstOperand = true;
    this._isFirstOperandAfterOperator = false;
  }

}
