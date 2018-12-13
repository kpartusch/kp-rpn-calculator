import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ApiResult<T> {
  data: T;
  errors: ApiError[];
}

interface ApiError {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  public postCalculation(inputs: string[]): Observable<number> {
    return this.http
      .post<ApiResult<number>>('http://localhost:3001/api/calculator', {inputs: inputs}, )
      .pipe(
        map((response: ApiResult<number>) => {
          return response.data;
        }),
        catchError(err => this.handleError(err))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
