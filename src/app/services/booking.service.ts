import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Booking} from '../models/booking'



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  createBooking(input)
  {
    this.httpClient.post('/api/booking/add', input).subscribe(r=>
      
      {
        console.log(r);
        if("true"==r.toString())
        {
          alert("Booking created successfully!");
         // this.router.navigateByUrl("/setMyHome/admin");
        }
        
      })
  }

  getAllEvents():Observable<Event[]>
  {
    return this.httpClient.get<Event[]>('/api/event/all');
  }

  getAllBookings(): Observable<Booking[]>
  {
    return this.httpClient.get<Booking[]>('/api/booking/fetchAll');

  }
}
