import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  writePost(data) {
    console.log(data);
    return this.http
      .post(`${apiUrl}/post`, data)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  getpostList(userId: string, areaId: string, page = 1) {
    return this.http
      .get(`${apiUrl}/post/${userId}/${areaId}?page=${page}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  getPostDetails(postId: string) {
    return this.http
      .get(`${apiUrl}/post/details/${postId}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  postReact(data) {
    return this.http
      .put(`${apiUrl}/post/react`, data)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
