import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';
import { Operand } from '../models/operand';

export class PullDownAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    context.stack.unshift(<Operand>{value: context.result});
    return new ProcessActionResult(context.stack.pop().value);
  }
}
