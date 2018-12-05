import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-calculator-buttons',
  template: '<p>This is the mock calculator buttons component</p>'
})
export class MockButtonsComponent {
  @Input() hasResult: boolean;
}
