import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';

export class AllClearAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    const shouldClear = +context.result !== 0;
    const actionResult = new ProcessActionResult('0', true, true);
    if (shouldClear) {
      return actionResult;
    }
    context.clearStack();
    return actionResult;
  }
}
