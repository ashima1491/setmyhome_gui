import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  public userSubject = new BehaviorSubject<User>(null);

  constructor(public httpVar: HttpClient, private router : Router) { }

  signUp(user)
  {
    var userInput :User ={} as any;
    userInput= user;
    //console.log(userInput);
     //for heroku
    // this.httpVar.post('https://fierce-woodland-50366.herokuapp.com/login/add',
    // userInput).subscribe(r=> 
    //   {
    //     if(r.toString ()=="true")
    //     {
    //       alert("Successful Sign Up!");
    //       this.router.navigateByUrl("/setMyHome/login");
    //     }
    //     else if (r.toString()=="A user with this email already exists!")
    //     {
    //       alert("A user with this email already exists!");
    //     }
        
    //   }
    //  );

    // for local
     this.httpVar.post('/api/login/add', userInput).subscribe(r=> 
      {
        console.log(r);
          if(r.toString ()=="true")
        {
          alert("Successful Sign Up!");
          this.router.navigateByUrl("/setMyHome/login");
        }
        else if (r.toString()=="false")
        {
          alert("A user with this email already exists!");
        }
        
      }
     );
    
  }

  login(user):Observable<User>
  {
    var userInput :User ={} as any;
    userInput= user;
   // console.log(userInput);
      //for heroku
   // return this.httpVar.post<User>('https://fierce-woodland-50366.herokuapp.com/login/authenticate', userInput);
      
      //for local
      return this.httpVar.post<User>('/api/login/authenticate', userInput);

}

  fetchAllUsers() :Observable<User[]>
  {
    
      //for heroku
    //return this.httpVar.get<User[]>('https://fierce-woodland-50366.herokuapp.com/login/all');

      //for local
      return this.httpVar.get<User[]>('/api/login/all');

  }
}
