import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { MockStackComponent } from './stack/mock-stack.component';
import { MockButtonsComponent } from './buttons/mock-buttons.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent,
        MockStackComponent,
        MockButtonsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasResult', () => {
    it('should be true when one or more operands processed', () => {
      const operand = '9';

      component.processOperand(operand);

      expect(component.hasResult).toBeTruthy();
    });

    it('should be false when no operands processed', () => {
      expect(component.hasResult).toBeFalsy();
    });

    it('should be false when zero operand processed', () => {
      const operand = '0';

      component.processOperand(operand);

      expect(component.hasResult).toBeFalsy();
    });

    it('should be false when multiple zero operands processed', () => {
      const operand = '0';

      component.processOperand(operand);
      component.processOperand(operand);

      expect(component.hasResult).toBeFalsy();
    });
  });

  describe('result', () => {
    it('should have result equal to operand when first operand processed', () => {
      const expectedResult = '9';

      component.processOperand(expectedResult);

      expect(component.result).toBe(expectedResult);
    });

    it('should have result concatenation of operands when second or more operand', () => {
      const firstOperand = '9';
      const secondOperand = '8';
      const expectedResult = firstOperand + secondOperand;

      component.processOperand(firstOperand);
      component.processOperand(secondOperand);

      expect(component.result).toBe(expectedResult);
    });

    it('should have zero result when one zero operand processed', () => {
      const expectedResult = '0';

      component.processOperand(expectedResult);

      expect(component.result).toBe(expectedResult);
    });

    it('should have zero result when more than one zero operand processed', () => {
      const expectedResult = '0';

      component.processOperand(expectedResult);
      component.processOperand(expectedResult);

      expect(component.result).toBe(expectedResult);
    });
  });
});
