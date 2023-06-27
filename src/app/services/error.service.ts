import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (!err.error || !err.error.error) {
      errMsg = 'Network error';
    } else if (err.error.error.message) {
      errMsg = err.error.error.message;
    } else {
      errMsg = 'Unknown error occured, try agaian';
    }
    return errMsg;
  }
}
