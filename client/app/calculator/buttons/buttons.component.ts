import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonsComponent implements OnInit {

  @Input() hasResult: boolean;

  @Output() operandEntered = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public operand(value: string): void {
    this.operandEntered.emit(value);
  }

}
