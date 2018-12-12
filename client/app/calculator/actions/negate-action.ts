import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';

export class NegateAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    const resultValue = +context.result * -1;
    return new ProcessActionResult(resultValue.toString());
  }
}
