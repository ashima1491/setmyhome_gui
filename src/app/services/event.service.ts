import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  createEvent(input)
  {
    //for local
    this.httpClient.post('/api/event/add', input).subscribe(r=>
      
      {
        console.log(r);
        if("true"==r.toString())
        {
          alert("Event created successfully!");
         // this.router.navigateByUrl("/setMyHome/admin");
        }
        
      });


    // for heroku
      // this.httpClient.post('https://fierce-woodland-50366.herokuapp.com/event/add', input).subscribe(r=>
      
      //   {
      //     console.log(r);
      //     if("true"==r.toString())
      //     {
      //       alert("Event created successfully!");
      //      // this.router.navigateByUrl("/setMyHome/admin");
      //     }
          
      //   })
  }
}
