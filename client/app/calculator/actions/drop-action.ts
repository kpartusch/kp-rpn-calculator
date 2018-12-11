import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';

export class DropAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    if (context.stack.length === 0) {
      return new ProcessActionResult(undefined, true, true);
    }
    return new ProcessActionResult(context.stack.pop().value);
  }
}
