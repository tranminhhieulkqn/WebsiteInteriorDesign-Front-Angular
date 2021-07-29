import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Appointment } from '../models/appointment.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  /** API URL */
  private urlAPI = `${environment.apiBackUrl}appointment/`;
  private urlCreate = `${this.urlAPI}create`
  private urlgetByUser = `${this.urlAPI}getByUser`
  private urlgetByID = `${this.urlAPI}getByID`


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //////// Get methods //////////

  /** GET appointment by user from the server */
  getAppointmentByUser(pageSize: number = 1, currentPage: number = 1,
    userID: string, role: string = 'user'): Observable<Appointment[]> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('currentPage', currentPage.toString())
      .set('userID', userID.toString())
      .set('role', role.toString());
    const url = `${this.urlgetByUser}?${params.toString()}`;
    return this.http.get<Appointment[]>(url)
      .pipe(
        tap(_ => this.log('fetched appointments by user')),
        catchError(this.handleError<Appointment[]>('getAppointmentByUser', []))
      );
  }

  /** GET appointment by id from the server */
  getAppointmentByID(id: string): Observable<Appointment> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', id.toString());
    const url = `${this.urlgetByID}?${params.toString()}`;
    return this.http.get<Appointment>(url)
      .pipe(
        tap(_ => this.log('fetched appointment by id')),
        catchError(this.handleError<Appointment>(`getAppointmentByID id = ${id}.`))
      );
  }

  /** POST: add new appointment to the server */
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.urlCreate, appointment, this.httpOptions).pipe(
      tap((newViewed: Appointment) => this.log(`added new appointment`)),
      catchError(this.handleError<Appointment>('addAppointment'))
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
    this.messageService.show(`AppointmentService: ${message}`);
  }

}
