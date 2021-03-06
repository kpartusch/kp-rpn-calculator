import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { CalculatorAction } from '../models/calculator-action';
import { EnterAction } from '../actions/enter-action';
import { SwapAction } from '../actions/swap-action';
import { PullDownAction } from '../actions/pull-down-action';
import { PushUpAction } from '../actions/push-up-action';
import { DropAction } from '../actions/drop-action';
import { AllClearAction } from '../actions/all-clear-action';
import { NegateAction } from '../actions/negate-action';
import { FractionAction } from '../actions/fraction-action';
import { Operator } from '../models/operator.enum';
import { Operators } from '../calculator.component';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonsComponent implements OnInit {
  public operatorTypes = Operator;

  @Input() hasResult: boolean;

  @Output() operandEntered = new EventEmitter<string>();

  @Output() actionEntered = new EventEmitter<CalculatorAction>();

  @Output() operatorEntered = new EventEmitter<Operator>();

  constructor() { }

  ngOnInit() {
  }

  public operand(value: string): void {
    this.operandEntered.emit(value);
  }

  public enter(): void {
    this.actionEntered.emit(new EnterAction());
  }

  public swap(): void {
    this.actionEntered.emit(new SwapAction());
  }

  public pullDown(): void {
    this.actionEntered.emit(new PullDownAction());
  }

  public pushUp(): void {
    this.actionEntered.emit(new PushUpAction());
  }

  public drop(): void {
    this.actionEntered.emit(new DropAction());
  }

  public allClear(): void {
    this.actionEntered.emit(new AllClearAction());
  }

  public negate(): void {
    this.actionEntered.emit(new NegateAction());
  }

  public fraction(): void {
    this.actionEntered.emit(new FractionAction());
  }

  public operator(operator: Operators) {
    this.operatorEntered.emit(operator);
  }
}
