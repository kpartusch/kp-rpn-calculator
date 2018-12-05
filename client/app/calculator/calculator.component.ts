import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  private result = '0';

  public get hasResult(): boolean {
    return this.result !== '0';
  }

  constructor() { }

  ngOnInit() {
  }

}
