import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import SpyObj = jasmine.SpyObj;

import { CalculatorComponent } from './calculator.component';
import { MockStackComponent } from './stack/mock-stack.component';
import { MockButtonsComponent } from './buttons/mock-buttons.component';
import { CalculatorAction } from './models/calculator-action';
import { CalculatorContext } from './models/calculator-context';
import { ProcessActionResult } from './models/process-action-result';
import { Operand } from './models/operand';
import { Operator } from './models/operator.enum';
import { CalculatorService } from './calculator.service';
import { EnterAction } from './actions/enter-action';

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

class TestClearStackAction implements CalculatorAction {
  public stack: Operand[];

  execute(context: CalculatorContext): ProcessActionResult {
    context.clearStack();
    return new ProcessActionResult();
  }
}

type TestUpdateStackFn = (stack: Operand[]) => void;

class TestUpdateStackAction implements CalculatorAction {
  private readonly _updateFn: TestUpdateStackFn;

  constructor(updateFn: TestUpdateStackFn) {
    this._updateFn = updateFn;
  }

  execute(context: CalculatorContext): ProcessActionResult {
    if (this._updateFn) {
      this._updateFn(context.stack);
    }
    return new ProcessActionResult();
  }
}

describe('CalculatorComponent', () => {
  const defaultResultValue = '0';
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorServiceSpy: SpyObj<CalculatorService>;

  beforeEach(async(() => {
    calculatorServiceSpy = jasmine.createSpyObj<CalculatorService>('CalculatorService', ['postCalculation']);
    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent,
        MockStackComponent,
        MockButtonsComponent
      ],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceSpy }
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

    it('should have result concatenation of operands when second or more zero operands', () => {
      const firstOperand = '9';
      const secondOperand = '0';
      const expectedResult = firstOperand + secondOperand;

      component.processOperand(firstOperand);
      component.processOperand(secondOperand);

      expect(component.result).toBe(expectedResult);
    });

    it('should have zero result when one zero operand processed first', () => {
      const expectedResult = '0';

      component.processOperand(expectedResult);

      expect(component.result).toBe(expectedResult);
    });

    it('should have zero result when more than one zero operand processed first', () => {
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

    it('should set stack to value from action result', (done: DoneFn) => {
      const expectedFirstOperand = <Operand>{value: '23'};
      const expectedActionResult = new TestUpdateStackAction((stack) => stack.push(expectedFirstOperand));

      // Verifying the stack is empty for the first subscription result
      component.stack$.pipe(take(1)).subscribe(stack => {
        expect(stack.length).toBe(0);
      });

      // Verifying the stack has the value add during action
      component.stack$.pipe(skip(1), take(1)).subscribe(stack => {
        expect(stack.length).toBe(1);
        expect(stack[0]).toEqual(expectedFirstOperand);
        done();
      });

      component.processAction(expectedActionResult);
    });

    it('should set stack from clear action result', (done: DoneFn) => {
      const clearActionResult = new TestClearStackAction();
      const updateActionResult = new TestUpdateStackAction((stack) => stack.push(<Operand>{value: '23'}));

      // Verifying the stack is empty for the first subscription result
      component.stack$.pipe(take(1)).subscribe(stack => {
        expect(stack.length).toBe(0);
      });

      // Verifying the stack has the value add during action
      component.stack$.pipe(skip(1), take(1)).subscribe(stack => {
        expect(stack.length).toBe(1);
      });

      // Verifying the stack has the value cleared during action
      component.stack$.pipe(skip(2), take(1)).subscribe(stack => {
        expect(stack.length).toBe(0);
        done();
      });

      component.processAction(updateActionResult);
      component.processAction(clearActionResult);
    });
  });

  describe('processOperator', () => {
    describe('percent operator received', () => {
      it('should send result and operator when result and no stack entries', fakeAsync(() => {
        const operand = '100';
        const expectedResult = '0.1';
        const expectedOperator = Operator.Percent;
        calculatorServiceSpy.postCalculation.and.returnValue(of(+expectedResult));
        component.processOperand(operand);

        component.processOperator(expectedOperator);
        tick();

        expect(component.result).toBe(expectedResult);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledTimes(1);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledWith([operand, expectedOperator]);
      }));

      it('should send first stack entry, result, and operator when stack has entries', fakeAsync(() => {
        const firstOperand = '200';
        const secondOperand = '10';
        const expectedResult = '20';
        const expectedOperator = Operator.Percent;
        calculatorServiceSpy.postCalculation.and.returnValue(of(+expectedResult));
        component.processOperand(firstOperand);
        component.processAction(new EnterAction());
        component.processOperand(secondOperand);

        component.processOperator(expectedOperator);
        tick();

        expect(component.result).toBe(expectedResult);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledTimes(1);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledWith([firstOperand, secondOperand, expectedOperator]);
      }));

      it('should do nothing when has result is false', () => {
        component.processOperator(Operator.Percent);

        expect(component.result).toBe('0');
        expect(calculatorServiceSpy.postCalculation).not.toHaveBeenCalled();
      });
    });

    describe('two number operator received', () => {
      it('should send first stack entry, result, and operator when stack has at least one entry', fakeAsync(() => {
        const firstOperand = '10';
        const secondOperand = '10';
        const expectedResult = '100';
        const expectedOperator = Operator.Multiply;
        calculatorServiceSpy.postCalculation.and.returnValue(of(+expectedResult));
        component.processOperand(firstOperand);
        component.processAction(new EnterAction());
        component.processOperand(secondOperand);

        component.processOperator(expectedOperator);
        tick();

        expect(component.result).toBe(expectedResult);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledTimes(1);
        expect(calculatorServiceSpy.postCalculation).toHaveBeenCalledWith([firstOperand, secondOperand, expectedOperator]);
      }));

      it('should do nothing when there is no stack entries and only a result', () => {
        const operand = '100';
        component.processOperand(operand);

        component.processOperator(Operator.Minus);

        expect(component.result).toBe(operand);
        expect(calculatorServiceSpy.postCalculation).not.toHaveBeenCalled();
      });

      it('should do nothing when there is no stack entries and no result', () => {
        component.processOperator(Operator.Plus);

        expect(component.result).toBe('0');
        expect(calculatorServiceSpy.postCalculation).not.toHaveBeenCalled();
      });
    });
  });
});
