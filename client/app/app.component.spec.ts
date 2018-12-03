import { TestBed, async } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MockCalculatorComponent } from './calculator/mock-calculator.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [
        AppComponent,
        MockCalculatorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'kp-rpn-calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('kp-rpn-calculator');
  });
});
