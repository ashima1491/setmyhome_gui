import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FurnitureService } from 'src/app/services/furniture.service';
import { Furniture } from 'src/app/models/furniture';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';
import {BookingFurniture}  from 'src/app/models/BookingFurniture';
import { BookingInput } from 'src/app/models/booking-input';
 

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

/* variables used throughout this class */
  rForm: FormGroup; // used for this reactive form
  eventName: string; // form-control referring to event drop down on html page
  heavyFurnitureName: string; // form-control referring to heavy furniture checkboxes on html page
  mediumFurnitureName: string; // form-control referring to medium furniture checkboxes on html page
  smallFurnitureName: string; // form-control referring to small furniture checkboxes on html page
  heavyCategoryCount: number; // form-control referring to quantity of heavy furniture on html page
  mediumCategoryCount: number; // form-control referring to quantity of medium furniture on html page
  lowCategoryCount: number; // form-control referring to quantity of small furniture on html page
  timeSlot: string; // form-control referring to time slot drop down on html page
  defaultTimeSlot: string="8.00 a.m. - 9.00 a.m."; // default value for time slot so that it shows pre selected 
  defaultEvent: number; // default event to be shown pre selected in event drop down
  heavyFurniture: Furniture[];  // list of furniture in 'Heavy' category
  mediumFurniture: Furniture[];  // list of furniture in 'Medium' category
  smallFurniture: Furniture[]; // list of furniture in 'Small' category
  bookinglist: Furniture[];  // final list of furniture selected by donor/student
  furnitureKeyValue: BookingFurniture[]; // furniture list with its maximum available quantity in stock
  username: string; // user first name
  isAdmin: boolean; // flag to indicate if user type is 'admin'
  userId: string; // user unique id
  type: string; // user type which can be 'admin', 'donor', 'student'

  
  events: Event[];
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private userService: UserServiceService
    , private furnitureService: FurnitureService)
  
  { 
    this.getAllEvents(); // method to get list of all GiveAway events added by admin 
    this.getKeyValuePairs();  // method to get list of furniture with maximum available quantity in stock
    this.getHeavy("Heavy");  // method to get list of furniture in 'Heavy' category
    this.getMedium("Medium"); // method to get list of furniture in 'Medium' category
    this.getSmall("Small"); // method to get list of furniture in 'Small' category
    this.bookinglist = [];
   
      // validations
    this.rForm = this.formBuilder.group(
      {
        'eventName': [this.defaultEvent],
        'heavyCategoryCount': [0],
        'mediumCategoryCount': [0],
        'lowCategoryCount': [0],
        'heavyFurnitureName': [null],
        'mediumFurnitureName': [null],
        'smallFurnitureName': [null],
        'timeSlot': [this.defaultTimeSlot]
       
      }
    );
  }

  ngOnInit() {
    // intializing user's attributes on page loading
    this.userService.subject.subscribe(user=>
      {
        console.log(user);
         
          
        this.username= null==user?"": user.fname;
        this.isAdmin= null==user? false:user.type=='admin';
        this.userId= null==user?"": user.userId;
        this.type=null==user?"": user.type;
      });
 
    if(this.userService.isLogged())
    {
      
      this.username= this.userService.getFname();
      this.isAdmin= this.userService.isAdmin();
      this.userId= this.userService.getUserId();
      this.type= this.userService.getUserType();

    }
  }

   // method to get list of furniture with maximum available quantity in stock
  getKeyValuePairs() {
    this.bookingService.getFurnitureKeyValuePairs().subscribe(r =>
    {
      console.log(r);
      this.furnitureKeyValue = r;

    })
  }
// method to get list of all GiveAway events added by admin 
  getAllEvents()
  {
    this.bookingService.getAllEvents().subscribe(events=>
      {
       // console.log(events);
        this.events=events;
        console.log(events[0]);
        this.defaultEvent=events[0].eventId;
        console.log(this.defaultEvent);
      }

      
    )
  }
// method to get list of furniture in 'Heavy' category
  getHeavy(category) {

    this.furnitureService.getFurnitureList(category).subscribe(heavyList => {
       console.log(heavyList);
       this.heavyFurniture = heavyList;

    }
    )
  }

  // method to get list of furniture in 'Medium' category
  getMedium(category) {
    this.furnitureService.getFurnitureList(category).subscribe(mediumList => {
      console.log(mediumList);
      this.mediumFurniture = mediumList;

    }
    )
  }

  // method to get list of furniture in 'Small' category
  getSmall(category) {

    this.furnitureService.getFurnitureList(category).subscribe(smallList => {
      console.log(smallList);
      this.smallFurniture = smallList;

    }
    )
  }
/* method called on key up event triggered when user enters a quantity of furniture.
   This method creates a list of furniture with quantities that the donor/student enters.
   This list is sent to the back-end for creating a booking containing list of furniture.

   For student, there is an added validation that they can only book the quantity less than
   the total stock available for their furniture
*/

  changeEvent(count, id) {

  
      console.log(this.type);

      let duplicateIndex = this.bookinglist.findIndex(x => x.furnitureId == id);


      if (duplicateIndex != -1) {
        this.bookinglist.splice(duplicateIndex, 1);
      }

      
      let selectionData = {} as Furniture;
     
      selectionData.furnitureId = id;
      selectionData.count = count;
    

      if (this.type == "donor") {

        this.bookinglist.push(selectionData);
      
        console.log(this.bookinglist);

      } else if (this.type == "student") {

        let index = this.furnitureKeyValue.findIndex(x => x.furniture.furnitureId == id);
       // available stock validation for student booking
        if (count <= this.furnitureKeyValue[index].count) {

          this.bookinglist.push(selectionData);
          console.log(this.bookinglist);

        } else {
          let stock = this.furnitureKeyValue[index].count - count;
          alert("We currently have " + stock + " items of this furniture left");
        }
      }
    
  }
  
 /* This method creates the actual booking. It captures the data from the page, and wraps it in an
 object format expected by the back end. After the service has been called, it resets the 
 form */
  createBooking(input)
  {

    

    let booking=   {} as BookingInput ;
    booking.eventId=input.eventName;
    booking.personId=this.userId;
    booking.timeSlot=input.timeSlot;
    booking.furnitureList= this.bookinglist;
   
    console.log(booking);

   
      this.bookingService.createBooking(booking);
      this.rForm.reset();
      this.rForm.get('eventName').setValue(this.defaultEvent);
      this.rForm.get('timeSlot').setValue(this.defaultTimeSlot);
      this.rForm.get('heavyCategoryCount').setValue(0);
      this.rForm.get('mediumCategoryCount').setValue(0);
      this.rForm.get('lowCategoryCount').setValue(0);
      this.bookinglist = [];
      this.furnitureKeyValue = [];

  }
}
