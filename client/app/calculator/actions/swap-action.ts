import { CalculatorAction } from '../models/calculator-action';
import { CalculatorContext } from '../models/calculator-context';
import { ProcessActionResult } from '../models/process-action-result';
import { Operand } from '../models/operand';

export class SwapAction implements CalculatorAction {
  execute(context: CalculatorContext): ProcessActionResult {
    if (context.stack.length === 0) {
      return new ProcessActionResult();
    }

    const stackValue = context.stack.pop();
    context.stack.push(<Operand>{value: context.result});
    return new ProcessActionResult(stackValue.value);
  }
}
