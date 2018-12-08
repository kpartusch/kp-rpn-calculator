import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-stack',
  template: '<p>This is the mock calculator stack component</p>'
})
export class MockStackComponent {
  @Input()
  public result = '0';
}
