import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { CalculatorAction } from '../models/calculator-action';
import { EnterAction } from '../enter-action';

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
    const action = new EnterAction();
    this.actionEntered.emit(action);
  }

}
