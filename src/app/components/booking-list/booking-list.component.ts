import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking[];
  // add this config
  settings = {
    columns: {
      eventName: {
        title: 'Event Name'
      },
      timeSlot: {
        title: 'Time Slot'
      },
      userName: {
        title: 'User Name'
      },
      userType: {
        title: 'User Type'
      }
    }
  };
  constructor( private bookingService: BookingService) { }

  ngOnInit() {

    this.bookingService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings;
      
    });
  }

}