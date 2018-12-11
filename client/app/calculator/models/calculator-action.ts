import { CalculatorContext } from './calculator-context';
import { ProcessActionResult } from './process-action-result';

export interface CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult;
}
