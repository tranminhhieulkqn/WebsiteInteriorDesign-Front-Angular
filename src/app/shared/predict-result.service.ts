import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { PredictResult } from '../models/predictResult.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PredictResultService {

  /** API URL */
  private urlAPI = `${environment.apiBackUrl}predictResult/`;
  private urlCreate = `${this.urlAPI}create`


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** POST: add a new viewed post to the server */
  addPredictResult(predictResult: PredictResult): Observable<PredictResult> {
    return this.http.post<PredictResult>(this.urlCreate, predictResult, this.httpOptions).pipe(
      tap((newViewed: PredictResult) => this.log(`added new predict result.`)),
      catchError(this.handleError<PredictResult>('addPredictResult'))
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
