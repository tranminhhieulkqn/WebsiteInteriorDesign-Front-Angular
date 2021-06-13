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

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  userCurrent$: Observable<User>;
  saltRounds = 10;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private localStorage: LocalStorageService
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
              .subscribe(res => {
                this.localStorage.set('token', res['token']);
              })
          })
      )
    } catch (error) { // catch error and throw error
      this.signOut(); // delete the user information at IndexedBD and token at LocalStorage
      throw new Error(error.message);
    }
  }

  signOut() {
    try { // try
      return from(this.afAuth.auth.signOut()
        .then(() => {
          this.localStorage.remove('token');
        })
      );
    } catch (error) { // catch error and throw error
      throw new Error(error.message);
    }
  }

  register(credentials: ICreateCredentials) {
    try { // try
      return from(
        // create new account with email and password
        this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then(
            () => {
              this.afAuth.auth.currentUser.updateProfile({ displayName: credentials.displayName });
              this.afAuth.auth.updateCurrentUser(this.afAuth.auth.currentUser);
            })
          .then(() => {
            // define new user on firestorage
            var user: User = {
              uid: this.afAuth.auth.currentUser.uid,
              email: credentials.email,
              password: credentials.password,
              displayName: credentials.displayName,
              role: 'user'
            }
            // define query parametters for request.
            let params = new HttpParams()
              .set('password', user.password.toString());
            // request to get new hash password to save firestorage
            this.http.get<User>(`${environment.apiBackUrl}users/hashpassword?${params.toString()}`)
              .subscribe(
                res => {
                  user.password = res['hashPass']; // change pass to hashed pass
                  const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
                  // update user data
                  userRef.set(user, { merge: true })
                },
                err => new Error(err.message)
              );
          }).catch(error => new Error(error.message))
      );
    } catch (error) { // catch error and throw error
      throw new Error(error.message);
    }
  }

  sendPasswordEmail(email) {
    try {
      return from(
        this.afAuth.auth.sendPasswordResetEmail(email)
          .then(() => {
            // set email will reset on local storage
            this.localStorage.set('emailReset', email);
          })
      );
    } catch (error) { // catch error and throw error
      throw new Error(error.message);
    }
  }

  resetPassword(credentials: IPasswordReset) {
    try {
      return from(
        this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword)
          .then(() => {
            let params = new HttpParams()
              .set('email', this.localStorage.get('emailReset').toString())
              .set('newPassword', credentials.newPassword.toString());
            this.http.put<User>(`${environment.apiBackUrl}users/changepassword?${params.toString()}`, {})
              .subscribe(
                res => {
                  console.log(res);
                  this.localStorage.remove('emailReset');
                },
                err => new Error(err.message)
              )
          })
          .catch(error => new Error(error.message))
      );
    } catch (error) { // catch error and throw error
      throw new Error(error.message);
    }
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

}
