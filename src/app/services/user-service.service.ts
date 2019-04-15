import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';


const TOKEN = 'TOKEN';
const FNAME='FNAME';
const ADMIN='ADMIN';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public subject = new BehaviorSubject<User>({} as any);

  constructor() { }
  setToken(token: User): void {
    localStorage.setItem(TOKEN, token.emailid);
    this.subject.next(token);
  }

  // isLogged(): Observable<boolean> {
  //   return Observable.create(localStorage.getItem(TOKEN) != null);
  // }
 
  // setAdminFlag()
  // {
  //   localStorage.setItem(ADMIN, 'Y');

  // }
  // isAdmin()
  // {
  //   return localStorage.getItem(ADMIN) == 'Y';
  // }
  // setFname(fname: string)
  // {
  //   localStorage.setItem(FNAME, fname);

  // }
  // getFname()
  // {
  //   return localStorage.getItem(FNAME);
  // }

  logout()
  {
    localStorage.clear();
    this.subject.next(null);
  }
}
