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
  filteredBookings: Booking;
  // add this config
  // settings = {
  //   columns: {
  //     eventName: {
  //       title: 'Event Name'
  //     },
  //     timeSlot: {
  //       title: 'Time Slot'
  //     },
  //     userName: {
  //       title: 'User Name'
  //     },
  //     userType: {
  //       title: 'User Type'
  //     }
  //   }
  // };
  constructor(private bookingService: BookingService) {
    this.filteredBookings = null;
  }

  /**
   * method called on loading of the component. This calles the service
   * to get list of all bookings and assigns it to its variable of type bookings 
   * to be shown on the html page in form of table records
   */
  ngOnInit() {

    this.bookingService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings;
      
    });
  }

  /**
   * function to open the window modal when clicked from view booking button. It displays the
  booking details in the modal window by filtering through the booking id 
   */ 
  openModal(x) {
    let index = this.bookings.findIndex(input => input.bookingId == x);
    this.filteredBookings = this.bookings[index];
  }
}
