import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  /** API URL */
  private urlAPI = `http://34.87.94.16/`;
  private urlPredict = `${this.urlAPI}predict`
  private urlDetele = `${this.urlAPI}delete`

  httpOptions = {
    method : "POST",
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //////// Save methods //////////

  /** POST: add a new post to the server */
  predictImage(url: string) {
    return this.http.post<string>(this.urlPredict, { url: url }, this.httpOptions).pipe(
      tap((res: any) => this.log(`predict new image`)),
      catchError(this.handleError<string>('predict'))
    );
  }

  /** DELETE: delete the post from the server */
  deleteFile(fileURL: string) {
    // define query parametters for request.
    let params = new HttpParams()
      .set('fileURL', fileURL.toString());
    // define query parametters for request.
    const url = `${this.urlDetele}?${params.toString()}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted image successfully!`)),
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

  /** Log a UploadService message with the MessageService */
  private log(message: string) {
    this.messageService.show(`UploadService: ${message}`);
  }

}
