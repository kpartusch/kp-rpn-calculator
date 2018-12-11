import { Component, Input } from '@angular/core';
import {Operand} from '../models/operand';

@Component({
  selector: 'app-calculator-stack',
  template: '<p>This is the mock calculator stack component</p>'
})
export class MockStackComponent {
  @Input()
  public stack: Operand[];

  @Input()
  public result = '0';
}
