import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  findAll(path: string, filter = '', page = 0, size = 8, sortBy = '', direction = 'desc'): Observable<object> {
    return this.httpClient.get(path, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('direction', direction)
    }).pipe(catchError(error => this.handleError(error)));
  }

  findById(path: string, id: number): Observable<object> {
    return this.httpClient.get(`${path}/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  create(path: string, object: object): Observable<object> {
    return this.httpClient.post(path, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  update(path: string, object: object, id: number): Observable<object> {
    return this.httpClient.put(`${path}/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(path: string, object: object, id: number): Observable<object> {
    return this.httpClient.delete(`${path}/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  undo(path: string, object: object, id: number): Observable<object> {
    return this.httpClient.put(`${path}/undoDelete/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred, please try again.';
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${err.status} - An error occurred, please try again.`;
    }
    this.snackBar.open(errorMessage, 'OK', { duration: 10000 });
    return throwError(errorMessage);
  }
}
