import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  public userSubject = new BehaviorSubject<User>(null);

  constructor(public httpVar: HttpClient) { }

  signUp(user)
  {
    var userInput :User ={} as any;
    userInput= user;
    console.log(userInput);
    this.httpVar.post('https://fierce-woodland-50366.herokuapp.com/login/add', userInput).subscribe(r=> 
      {
        if(r.toString ()=="true")
        alert("Successful Sign Up!");
      }
     );

  }

  login(user):Observable<User>
  {
    var userInput :User ={} as any;
    userInput= user;
    console.log(userInput);
    return this.httpVar.post<User>('/api/login/authenticate', userInput);
      
}
}
