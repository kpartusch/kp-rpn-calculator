import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { ButtonsComponent } from './buttons.component';
import { EnterAction } from '../actions/enter-action';
import { SwapAction } from '../actions/swap-action';
import { PullDownAction } from '../actions/pull-down-action';
import { PushUpAction } from '../actions/push-up-action';
import { DropAction } from '../actions/drop-action';
import { AllClearAction } from '../actions/all-clear-action';
import { NegateAction } from '../actions/negate-action';
import { FractionAction } from '../actions/fraction-action';
import { Operator } from '../models/operator.enum';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatIconModule
      ],
      declarations: [ ButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit operand', (done: DoneFn) => {
    const expectedOperand = '3';

    component.operandEntered.subscribe(operand => {
      expect(operand).toBe(expectedOperand);
      done();
    });

    component.operand(expectedOperand);
  });

  it('should have all clear text when has no result', () => {
    const clearButton = fixture.debugElement.query(By.css('#clear-button'));
    expect(clearButton.nativeElement.textContent).toBe('AC');
  });

  it('should have clear text when has result', () => {
    const clearButton = fixture.debugElement.query(By.css('#clear-button'));
    component.hasResult = true;

    fixture.detectChanges();

    expect(clearButton.nativeElement.textContent).toBe('C');
  });

  it('should emit action when enter clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof EnterAction).toBeTruthy();
      done();
    });

    component.enter();
  });

  it('should emit action when swap clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof SwapAction).toBeTruthy();
      done();
    });

    component.swap();
  });

  it('should emit action when pull down clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof PullDownAction).toBeTruthy();
      done();
    });

    component.pullDown();
  });

  it('should emit action when push up clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof PushUpAction).toBeTruthy();
      done();
    });

    component.pushUp();
  });

  it('should emit action when drop clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof DropAction).toBeTruthy();
      done();
    });

    component.drop();
  });

  it('should emit action when all clear clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof AllClearAction).toBeTruthy();
      done();
    });

    component.allClear();
  });

  it('should emit action when all clear clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof NegateAction).toBeTruthy();
      done();
    });

    component.negate();
  });

  it('should emit action when fraction clicked', (done: DoneFn) => {
    component.actionEntered.subscribe(action => {
      expect(action instanceof FractionAction).toBeTruthy();
      done();
    });

    component.fraction();
  });

  it('should emit operator when an operator button is clicked', (done: DoneFn) => {
    const expectedOperator = Operator.Plus;
    component.operatorEntered.subscribe(operator => {
      expect(operator).toBe(expectedOperator);
      done();
    });

    component.operator(expectedOperator);
  });
});
