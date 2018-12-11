import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { ButtonsComponent } from './buttons.component';
import { EnterAction } from '../enter-action';
import { SwapAction } from '../actions/swap-action';
import { PullDownAction } from '../actions/pull-down-action';

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
});
