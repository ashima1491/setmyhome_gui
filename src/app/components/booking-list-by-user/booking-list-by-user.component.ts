import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { UserServiceService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-booking-list-by-user',
  templateUrl: './booking-list-by-user.component.html',
  styleUrls: ['./booking-list-by-user.component.css']
})
export class BookingListByUserComponent implements OnInit {

  bookings: Booking[];
  filteredBookings: Booking;
  constructor(private userService: UserServiceService, private bookingService: BookingService) {
    this.filteredBookings = null;}

  ngOnInit() {

    var userId=this.userService.getUserId();
    this.bookingService.getAllBookingsByUser(userId).subscribe(bookings => {
      console.log(bookings);
      this.bookings = bookings; 
    });

  }

  openModal(x) {
    let index = this.bookings.findIndex(input => input.bookingId == x);
    this.filteredBookings = this.bookings[index];
    console.log(this.filteredBookings);
  }

}
