import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  getAreaList() {
    return this._http
      .get(`${apiUrl}/area`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  getAreaPostsCount(userId = 'all') {
    return this._http
      .get(`${apiUrl}/area/postByArea/${userId}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
