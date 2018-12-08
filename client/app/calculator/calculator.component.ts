import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  private isFirstOperand = true;

  public get result() {
    return this._result;
  }
  private _result = '0';

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

}
