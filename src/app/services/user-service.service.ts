import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';


const TOKEN = 'TOKEN';
const FNAME='FNAME';
const TYPE='TYPE';
const ID="ID";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public subject = new BehaviorSubject<User>({} as any);

  constructor() { }
  setToken(token: User): void {
    localStorage.setItem(TOKEN, token.emailid);
    localStorage.setItem(FNAME, token.fname);
    localStorage.setItem(TYPE, token.type);
    localStorage.setItem(ID, token.userId);
    this.subject.next(token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN)!=null;
  }
 


  // setAdminFlag()
  // {
  //   localStorage.setItem(ADMIN, 'Y');

  // }
  isAdmin()
  {
    return localStorage.getItem(TYPE) == 'admin';
  }
  // setFname(fname: string)
  // {
  //   localStorage.setItem(FNAME, fname);

  // }
  getFname()
  {
    return localStorage.getItem(FNAME);
  }
  getUserType()
  {
    return localStorage.getItem(TYPE);
  }
  getUserId()
  {
    return localStorage.getItem(ID);
  }
  logout()
  {
    localStorage.clear();
    this.subject.next(null);
  }
}
