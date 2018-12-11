import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';
import { Operand } from '../models/operand';

export class PushUpAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    context.stack.push(<Operand>{value: context.result});
    return new ProcessActionResult(context.stack.shift().value);
  }
}
