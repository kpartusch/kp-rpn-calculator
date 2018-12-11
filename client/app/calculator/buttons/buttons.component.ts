import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { CalculatorAction } from '../models/calculator-action';
import { EnterAction } from '../enter-action';
import { SwapAction } from '../actions/swap-action';
import { PullDownAction } from '../actions/pull-down-action';
import { PushUpAction } from '../actions/push-up-action';
import { DropAction } from '../actions/drop-action';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonsComponent implements OnInit {

  @Input() hasResult: boolean;

  @Output() operandEntered = new EventEmitter<string>();

  @Output() actionEntered = new EventEmitter<CalculatorAction>();

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
}
