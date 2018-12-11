export class ProcessActionResult {
  reset: boolean;
  resetResult: boolean;

  constructor(reset: boolean = false, resetResult: boolean = false) {
    this.reset = reset;
    this.resetResult = resetResult;
  }
}
