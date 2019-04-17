import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  rForm: FormGroup;
  eventName: string;
  heavyCategoryCount: number;
  mediumCategoryCount: number;
  lowCategoryCount: number;
  timeSlot: string;
  defaultTimeSlot: string="8.00 a.m. - 9.00 a.m.";
  defaultEvent: string="GiveAway Event on May 11";
  
  events: Event[];
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService,private userService: UserServiceService)
  
  { 
    this.getAllEvents();
    this.rForm = this.formBuilder.group(
      {
        'eventName': [this.defaultEvent],
        'heavyCategoryCount': [0],
        'mediumCategoryCount': [0],
        'lowCategoryCount': [0],
        'timeSlot': [this.defaultTimeSlot]
       
      }
    );
  }

  getAllEvents()
  {
    this.bookingService.getAllEvents().subscribe(events=>
      {
        console.log(events);
        this.events=events;

      }
      )
  }
  
  ngOnInit() {
  }

  createBooking(input)
  {
      var booking: Booking;
      booking=input;
      this.userService.subject.subscribe(user=> 
        
        {
          //console.log(user);
          if(null!=user)
          {
            booking.userName=user.fname;
            booking.userType=user.type;
          }
      
        })
      
      this.bookingService.createBooking(booking);
      this.rForm.reset();
      this.rForm.get('eventName').setValue(this.defaultEvent);
      this.rForm.get('timeSlot').setValue(this.defaultTimeSlot);
      this.rForm.get('heavyCategoryCount').setValue(0);
      this.rForm.get('mediumCategoryCount').setValue(0);
      this.rForm.get('lowCategoryCount').setValue(0);

  }
}
