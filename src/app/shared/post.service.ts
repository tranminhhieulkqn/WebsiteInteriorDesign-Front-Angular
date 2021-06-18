import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  /** API URL */
  private urlAPI = `${environment.apiBackUrl}posts/`;
  private urlCreate = `${this.urlAPI}create`
  private urlGetAll = `${this.urlAPI}get`;
  private urlGetBy = `${this.urlAPI}getBy`;
  private urlGetLast = `${this.urlAPI}getLast`;
  private urlUpdate = `${this.urlAPI}update`
  private urlDetele = `${this.urlAPI}delete`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //////// Get methods //////////

  /** GET posts from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlGetAll)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  /** GET post by id. Return `undefined` when id not found */
  getPostNo404<Data>(id: string | number): Observable<Post> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', id.toString());
    const url = `${this.urlGetBy}?${params.toString()}`;
    return this.http.get<Post[]>(url)
      .pipe(
        map(posts => posts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} post id=${id}`);
        }),
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }

  /** GET post by id. Will 404 if id not found */
  getPost(id: string | number): Observable<Post> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', id.toString());
    const url = `${this.urlGetBy}?${params.toString()}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** GET post by id. Will 404 if id not found */
  getLastPost(amount: number = 1): Observable<Post> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('amount', amount.toString());
    const url = `${this.urlGetLast}?${params.toString()}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched ${amount} lastest post.`)),
      catchError(this.handleError<Post>(`getLastPost`))
    );
  }

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

  /** POST: add a new post to the server */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.urlCreate, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added post '${newPost['post'].title}'`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  /** DELETE: delete the post from the server */
  deletePost(id: string | number): Observable<Post> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', id.toString());
    const url = `${this.urlDetele}?${params.toString()}`;
    return this.http.delete<Post>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  /** PUT: update the post on the server */
  updatePost(id: string | number, post: Post): Observable<any> {
    // define query parametters for request.
    let params = new HttpParams()
      .set('id', id.toString());
    const url = `${this.urlUpdate}?${params.toString()}`;
    return this.http.put(url, post, this.httpOptions).pipe(
      tap(_ => this.log(`updated post: ${post.title}`)),
      catchError(this.handleError<any>('updatePost'))
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
