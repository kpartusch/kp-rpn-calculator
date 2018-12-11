import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Operand } from '../models/operand';

@Component({
  selector: 'app-calculator-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StackComponent implements OnInit {
  @Input()
  public stack: Operand[];

  @Input()
  public result = '0';

  public get entries(): Operand[] {
    const entries = Object.assign([], this.stack);
    while (entries.length < 2) {
      entries.unshift(<Operand>{value: ''});
    }
    return entries;
  }

  constructor() { }

  ngOnInit() {
  }

}
