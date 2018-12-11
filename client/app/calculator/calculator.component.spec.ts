import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { MockStackComponent } from './stack/mock-stack.component';
import { MockButtonsComponent } from './buttons/mock-buttons.component';
import { CalculatorAction } from './models/calculator-action';
import { CalculatorContext } from './models/calculator-context';
import { ProcessActionResult } from './models/process-action-result';

class TestUpdateResultAction implements CalculatorAction {
  public result: string;

  execute(context: CalculatorContext): ProcessActionResult {
    return new ProcessActionResult(this.result);
  }
}

class TestResetAction implements CalculatorAction {
  public resetResult: boolean;
  public reset: boolean;

  execute(context: CalculatorContext): ProcessActionResult {
    return new ProcessActionResult(undefined, this.reset, this.resetResult);
  }
}

describe('CalculatorComponent', () => {
  const defaultResultValue = '0';
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

  describe('processAction', () => {
    it('should update result when result', () => {
      const expectedActionResult = new TestUpdateResultAction();
      expectedActionResult.result = '32';

      component.processAction(expectedActionResult);

      expect(component.result).toBe(expectedActionResult.result);
    });

    it('should not update result when no result', () => {
      const expectedActionResult = new TestUpdateResultAction();
      expectedActionResult.result = undefined;

      component.processAction(expectedActionResult);

      expect(component.result).toBe(defaultResultValue);
    });

    it('should reset operand count but not result value', () => {
      const expectedResult = '32';
      const expectedActionResult = new TestResetAction();
      expectedActionResult.reset = true;
      expectedActionResult.resetResult = false;

      component.processOperand('23');
      component.processAction(expectedActionResult);
      component.processOperand(expectedResult);

      expect(component.result).toBe(expectedResult);
    });

    it('should reset operand count and result value', () => {
      const expectedActionResult = new TestResetAction();
      expectedActionResult.reset = true;
      expectedActionResult.resetResult = true;

      component.processOperand('23');
      component.processAction(expectedActionResult);

      expect(component.result).toBe(defaultResultValue);
    });
  });
});
