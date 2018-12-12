import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';

export class FractionAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    if (!context.result.includes('.')) {
      return new ProcessActionResult(`${context.result}.`);
    }
    return new ProcessActionResult(context.result);
  }
}
