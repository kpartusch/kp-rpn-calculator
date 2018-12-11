export class ProcessActionResult {
  public get reset(): boolean {
    return this._reset;
  }
  private readonly _reset: boolean;

  public get resetResult(): boolean {
    return this._resetResult;
  }
  private readonly _resetResult: boolean;

  public get result(): string {
    return this._result;
  }
  private readonly _result: string;

  constructor(result?: string, reset: boolean = false, resetResult: boolean = false) {
    this._reset = reset;
    this._resetResult = resetResult;
    this._result = result;
  }
}
