import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  /** API URL */
  private urlAPI = `${environment.apiBackUrl}upload/`;
  private urlDetele = `${this.urlAPI}delete`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //////// Save methods //////////

  /** DELETE: delete the post from the server */
  deleteFile(fileURL: string) {
    // define query parametters for request.
    let params = new HttpParams()
      .set('fileURL', fileURL.toString());
    // define query parametters for request.
    const url = `${this.urlDetele}?${params.toString()}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted image successfully`)),
      catchError(this.handleError<string>('deleteImage'))
    );
  }


  //////// Catch and Handle Errors  //////////

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PostService message with the MessageService */
  private log(message: string) {
    this.messageService.show(`PostService: ${message}`);
  }


}
