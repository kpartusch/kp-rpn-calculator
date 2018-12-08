import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { ButtonsComponent } from './buttons.component';

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

  it('should have all clear text', () => {
    const clearButton = fixture.debugElement.query(By.css('#clear-button'));
    expect(clearButton.nativeElement.textContent).toBe('AC');
  });

  it('should have clear text', () => {
    const clearButton = fixture.debugElement.query(By.css('#clear-button'));
    component.hasResult = true;

    fixture.detectChanges();

    expect(clearButton.nativeElement.textContent).toBe('C');
  });
});
