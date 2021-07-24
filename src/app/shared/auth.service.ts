import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { auth } from 'firebase/app';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, catchError, retry } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { User } from "../models/user.model";
import { TestService } from "../shared/test.service";
import { error } from '@angular/compiler/src/util';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
  role: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  userCurrent$: Observable<User>;
  saltRounds = 10;
  defaultAvatarProfile = `https://storage.googleapis.com/interior-design-afc76.appspot.com/assets/users/default-avatar-profile.jpg`

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private localStorage: LocalStorageService,
    private messageService: MessageService
  ) {
    this.userCurrent$ = this.afAuth.authState
      .pipe(
        switchMap(userCurrent => {
          if (userCurrent) {
            return this.afStore.doc<User>(`users/${userCurrent.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  signIn(credentials: ISignInCredentials) {
    try { // try
      return from(
        this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
          .then(() => {
            this.http.post<User>(`${environment.apiBackUrl}users/login`, credentials)
              .subscribe(
                (res) => {
                  this.localStorage.set('token', res['token']);
                },
                (err) => { },
                () => {
                  // show message in log
                  this.log(`user '${this.user.displayName}' is logged in!`);
                }
              )
          })
      )
    } catch (error) { // catch error and throw error
      this.signOut(); // delete the user information at IndexedBD and token at LocalStorage
      catchError(this.handleError<any>(error.message))
    }
  }

  signOut() {
    try { // try
      let userLoggout = this.user.displayName;
      return from(this.afAuth.auth.signOut()
        .then(() => {
          this.localStorage.remove('token');
          // show message in log
          this.log(`user '${userLoggout}' has logged out!`);
        })
      );
    } catch (error) { // catch error and throw error
      catchError(this.handleError<any>(error.message))
    }
  }

  register(credentials: ICreateCredentials) {
    try { // try
      return from(
        // create new account with email and password
        this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then(
            (res) => {
              this.sendEmailVerification();
              this.afAuth.auth.currentUser.updateProfile({
                displayName: credentials.displayName,
                photoURL: this.defaultAvatarProfile
              });
              this.afAuth.auth.updateCurrentUser(this.afAuth.auth.currentUser);
              // show message in log
              this.log(`updated ${credentials.displayName}'s infor to firebase authentication successfully!`);
            })
          .then(
            (res) => {
              // define new user on firestorage
              var user: User = {
                uid: this.afAuth.auth.currentUser.uid,
                email: credentials.email,
                password: credentials.password,
                displayName: credentials.displayName,
                avatarURL: this.defaultAvatarProfile,
                role: credentials.role.toLowerCase()
              }
              // define query parametters for request.
              let params = new HttpParams()
                .set('password', user.password.toString());
              // request to get new hash password to save firestorage
              this.http.get<User>(`${environment.apiBackUrl}users/hashpassword?${params.toString()}`)
                .subscribe(
                  (res) => {
                    user.password = res['hashPass']; // change pass to hashed pass
                    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
                    // update user data
                    userRef.set(user, { merge: true })
                  }
                );
              // show message in log
              this.log(`updated ${credentials.displayName}'s infor to firestore database successfully!`);
            })
      );
    } catch (error) { // catch error
      catchError(this.handleError<any>(error.message))
    }
  }

  sendEmailVerification() {
    return this.user.sendEmailVerification()
      .then(
        (res) => {
          // show message in log
          this.log(`sent a verification email to '${this.user.email}'`);
        }
      );
  }

  verifyingEmail(oobCode: string) {
    try {
      return from(
        this.afAuth.auth.applyActionCode(oobCode)
          .then(
            (res) => {
              // show message in log
              this.log(`${this.user.displayName}'s email verified.`);
            }
          )
      );
    } catch (error) { // catch error
      catchError(this.handleError<any>(error.message))
    }
  }

  sendPasswordEmail(email) {
    try {
      return from(
        this.afAuth.auth.sendPasswordResetEmail(email)
          .then(() => {
            // set email will reset on local storage
            this.localStorage.set('emailReset', email);
            // show message in log
            this.log(`password reset email sent to email ${email}.`);
          })
      );
    } catch (error) { // catch error
      catchError(this.handleError<any>(error.message))
    }
  }

  resetPassword(credentials: IPasswordReset) {
    try {
      return from(
        this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword)
          .then(() => {
            let emailReset = this.localStorage.get('emailReset').toString()
            let params = new HttpParams()
              .set('email', emailReset)
              .set('newPassword', credentials.newPassword.toString());
            this.http.put<User>(`${environment.apiBackUrl}users/changepassword?${params.toString()}`, {})
              .subscribe(
                res => {
                  this.localStorage.remove('emailReset');
                  // show message in log
                  this.log(`reset password for account ${emailReset} successfully!`);
                }
              )
          })
      );
    } catch (error) { // catch error and throw error
      catchError(this.handleError<any>(error.message))
    }
  }

  updateProfile(avatarURL, displayName) {
    try { // try
      return from(
        // create new account with email and password
        this.afAuth.auth.currentUser.updateProfile({
          photoURL: avatarURL,
          displayName: displayName
        }).then(
          () => {
            // get user ref from firestore
            const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${this.user.uid}`);
            // update user data
            userRef.set({ avatarURL: avatarURL, displayName: displayName }, { merge: true })
            // show message in log
            this.log(`updated ${this.user.displayName}'s infor to firestore database successfully!`);
          }
        )
          .then(
            () => {
              this.afAuth.auth.updateCurrentUser(this.afAuth.auth.currentUser);
              // show message in log
              this.log(`updated ${this.user.displayName}'s avatar to database successfully!`);
            }
          )
      )
    } catch (error) { // catch error
      catchError(this.handleError<any>(error.message))
    }
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }


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

  /** Log a AuthService message with the MessageService */
  private log(message: string) {
    this.messageService.show(`AuthService: ${message}`);
  }

}
