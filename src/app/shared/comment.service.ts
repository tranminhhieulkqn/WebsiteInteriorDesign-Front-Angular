import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../models/comment.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // url to web api
  private urlAPI = `${environment.apiBackUrl}comments/`;
  private urlCreate = `${this.urlAPI}create`;
  private urlGetByPostID = `${this.urlAPI}getByPostID`;
  private urlGetAll = `${this.urlAPI}get`;
  private urlGetBy = `${this.urlAPI}getBy`;
  private urlRegister = `${this.urlAPI}register`
  private urlUpdate = `${this.urlAPI}update`

  // define header for request
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET comment for post by post id from the server */
  getCommentsForPost(postID: string): Observable<Comment[]> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', postID.toString());
    const url = `${this.urlGetByPostID}?${params.toString()}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(_ => this.log('fetched comments for post.')),
        catchError(this.handleError<Comment[]>('getCommentFor', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  // getHeroNo404<Data>(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/?id=${id}`;
  //   return this.http.get<Hero[]>(url)
  //     .pipe(
  //       map(heroes => heroes[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<Hero>(`getHero id=${id}`))
  //     );
  // }

  /** GET hero by id. Will 404 if id not found */
  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found heroes matching "${term}"`) :
  //        this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new comment for post to the server */
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlCreate, comment, this.httpOptions).pipe(
      tap((comment: Comment) => this.log(`added new comment for post w/ id=${comment.postID}`)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;

  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  /** PUT: update the hero on the server */
  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

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

  /** Log a CommentService message with the MessageService */
  private log(message: string) {
    this.messageService.show(`CommentService: ${message}`);
  }

}
