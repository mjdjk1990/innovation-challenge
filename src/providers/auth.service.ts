import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account/account.interface';
import { LoginResponse } from '../models/login/login-response.interface';
import { User } from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  get uid() {
    const userKey = Object.keys(localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    return userKey ? JSON.parse(localStorage.getItem(userKey)).uid : undefined;
  }


  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    }
    catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    }
    catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }

}
