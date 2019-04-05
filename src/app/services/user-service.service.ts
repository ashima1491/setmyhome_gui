import { Injectable } from '@angular/core';
const TOKEN = 'TOKEN';
const FNAME='FNAME'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  setFname(fname: string)
  {
    localStorage.setItem(FNAME, fname);

  }
  getFname()
  {
    return localStorage.getItem(FNAME);
  }

  logout()
  {
    localStorage.clear();
  }
}
