import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Booking} from '../models/booking'
import {Event} from '../models/event';
import { BookingFurniture } from '../models/BookingFurniture';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /* This method calls the POST rest end point for creating a booking */
  createBooking(input)
  {
    //for local
    // this.httpClient.post('/api/booking/add', input).subscribe(r=>
      
    //   {
    //     console.log(r);
    //     if("true"==r.toString())
    //     {
    //       alert("Booking created successfully!");
    //      // this.router.navigateByUrl("/setMyHome/admin");
    //     }
        
    //   });


      //for heroku
     
      this.httpClient.post('https://fierce-woodland-50366.herokuapp.com/booking/add', input).subscribe(r=>
      
        {
          console.log(r);
          if("true"==r.toString())
          {
            alert("Booking created successfully!");
           // this.router.navigateByUrl("/setMyHome/admin");
          }
          
        });
  }
   /* This method called the GET rest end point to fetch the list of events */
  getAllEvents():Observable<Event[]>
  {
    //return this.httpClient.get<Event[]>('/api/event/all');
    return this.httpClient.get<Event[]>('https://fierce-woodland-50366.herokuapp.com/event/all');
  }

     /* This method called the GET rest end point to fetch the list of bookings */
  getAllBookings(): Observable<Booking[]>
  {
    //return this.httpClient.get<Booking[]>('/api/booking/fetchAll');
    return this.httpClient.get<Booking[]>('https://fierce-woodland-50366.herokuapp.com/booking/fetchAll');

  }
     /* This method called the GET rest end point to fetch the list of bookings by user */
  getAllBookingsByUser(userId): Observable<Booking[]>
  {
   // return this.httpClient.get<Booking[]>('/api/booking/fetch/'+userId);
    return this.httpClient.get<Booking[]>('https://fierce-woodland-50366.herokuapp.com/booking/fetch/'+userId);

  }

       /* This method called the GET rest end point to fetch the list of furniture stock available */

  getFurnitureKeyValuePairs(): Observable<BookingFurniture[]> {
    return this.httpClient.get<BookingFurniture[]>('https://fierce-woodland-50366.herokuapp.com/bookedFurniture/stock');
    //return this.httpClient.get<BookingFurniture[]>('/api/bookedFurniture/stock');

  
  }




}
