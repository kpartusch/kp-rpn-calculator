import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calculator-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonsComponent implements OnInit {

  @Input() hasResult: boolean;

  constructor() { }

  ngOnInit() {
  }

}
