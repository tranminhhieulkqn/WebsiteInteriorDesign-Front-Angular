import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { auth } from 'firebase/app';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, catchError, retry } from "rxjs/operators";
import { User } from "../models/user.model";

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

  userRole$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private http: HttpClient
  ) {
    this.userRole$ = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  private updateUserRole(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const data = {
      role: 'customer'
    }
    return userRef.set(data, { merge: true })
  }

  signIn(credentials: ISignInCredentials): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
  }

  googleLogin() {
    return from(this.oAuthLogin(new auth.GoogleAuthProvider()));
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserRole(credential.user);
        console.log('You have been successfully logged in!')
      }).catch((error) => {
        console.log(error)
      })
  }

  signOut() {
    return from(this.afAuth.auth.signOut());
  }

  register(credentials: ICreateCredentials) {
    return from(
      // this.http.post('http://localhost:3000/users/register').pipe(

      // );
      // try {

      // } catch (error) {

      // }
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        () => {
          this.user.updateProfile({ displayName: credentials.displayName });
          this.afAuth.auth.updateCurrentUser(this.user);
          this.updateUserRole(this.user);
        }
      )
    );
  }

  sendPasswordEmail(email) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  resetPassword(credentials: IPasswordReset) {
    return from(this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword));
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  updateAvatar(newPhotoURL) {
    return from(
      this.user.updateProfile({
        photoURL: newPhotoURL
      }).then(function () {
        console.log("Update avatar successfully!");
      }).catch(function (err) {
        console.error(err);
      })
    )
  }

  updatePassword(newPassword) {
    return from(
      this.user.updatePassword(newPassword)
        .then(function () {
          console.log("Update password successfully!");
        }).catch(function (err) {
          console.error(err);
        })
    )
  }

  updateProfile(newProfile) {
    return from(
      this.user.updateProfile(newProfile)
        .then(function () {
          console.log("Update profile successfully!");
        }).catch(function (err) {
          console.error(err);
        })
    )
  }

  ///// Role-based Authorization //////

  // Determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (user) return false;
    return allowedRoles.includes(user.role);
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'designer', 'customer'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean{
    const allowed = ['admin', 'designer'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean{
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

}
