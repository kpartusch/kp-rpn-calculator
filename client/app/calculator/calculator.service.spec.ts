import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs';

import { CalculatorService } from './calculator.service';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('CalculatorService', () => {
  let httpTestingController: HttpTestingController;
  let calculatorService: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CalculatorService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    calculatorService = TestBed.get(CalculatorService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(calculatorService).toBeTruthy();
  });

  it('should return expected result', () => {
    calculatorService.postCalculation(['32', '12', '-'])
      .subscribe(
        result => { expect(result).toEqual(20); },
        ()  => fail('expected result not an error')
      );

    const postUrl = '/api/calculator';
    const request = httpTestingController.expectOne(postUrl);

    expect(request.request.method).toBe('POST');
    request.flush({data: 20}, { status: 200, statusText: 'OK'});
  });

  it('should return an error when the server returns a 404', () => {
    const errorMessage = 'deliberate 404 error';

    calculatorService.postCalculation(['32', '12', '-'])
      .subscribe(
        () => fail('expected an error, not a result'),
        (error) => {
        expect(error).toEqual('Something bad happened; please try again later.');
      }
    );

    const postUrl = '/api/calculator';
    const request = httpTestingController.expectOne(postUrl);

    expect(request.request.method).toBe('POST');
    request.flush(errorMessage, { status: 404, statusText: 'Not Found'});
  });
});
