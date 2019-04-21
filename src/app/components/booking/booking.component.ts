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
 

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  rForm: FormGroup;
  eventName: string;
  heavyFurnitureName: string;
  mediumFurnitureName: string;
  smallFurnitureName: string;
  heavyCategoryCount: number;
  mediumCategoryCount: number;
  lowCategoryCount: number;
  timeSlot: string;
  defaultTimeSlot: string="8.00 a.m. - 9.00 a.m.";
  defaultEvent: string = "GiveAway Event on May 11";
  heavyFurniture: Furniture[];
  mediumFurniture: Furniture[];
  smallFurniture: Furniture[];
  // bookinglist: Array<Bookingviewmodel>;
  // furnitureKeyValue: Array<Bookingviewmodel>;
  bookinglist: BookingFurniture[];
  furnitureKeyValue: BookingFurniture[];
  username: string;
  isAdmin: boolean;
  userId: string;
  type: string;

  
  events: Event[];
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private userService: UserServiceService
    , private furnitureService: FurnitureService)
  
  { 
    this.getAllEvents();
    this.getKeyValuePairs();
    this.getHeavy("Heavy");
    this.getMedium("Medium");
    this.getSmall("Small");
    this.bookinglist = [];
   
    // this.furnitureKeyValue = [{ furnitureName: "Couch", count: 5 }, { furnitureName: "Table", count: 5}];

    this.rForm = this.formBuilder.group(
      {
        'eventName': [this.defaultEvent],
        'heavyCategoryCount': [],
        'mediumCategoryCount': [],
        'lowCategoryCount': [],
        'heavyFurnitureName': [null],
        'mediumFurnitureName': [null],
        'smallFurnitureName': [null],
        'timeSlot': [this.defaultTimeSlot]
       
      }
    );
  }

  ngOnInit() {
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

  getKeyValuePairs() {
    this.bookingService.getFurnitureKeyValuePairs().subscribe(r =>
    {
      console.log(r);
      this.furnitureKeyValue = r;

    })
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

  getHeavy(category) {

    this.furnitureService.getFurnitureList(category).subscribe(heavyList => {
       console.log(heavyList);
       this.heavyFurniture = heavyList;

    }
    )
  }

  getMedium(category) {
    this.furnitureService.getFurnitureList(category).subscribe(mediumList => {
      console.log(mediumList);
      this.mediumFurniture = mediumList;

    }
    )
  }

  getSmall(category) {

    this.furnitureService.getFurnitureList(category).subscribe(smallList => {
      console.log(smallList);
      this.smallFurniture = smallList;

    }
    )
  }

  changeEvent(count, id) {

  
      console.log(this.type);

      let duplicateIndex = this.bookinglist.findIndex(x => x.furniture.furnitureId == id);

      if (duplicateIndex != -1) {
        this.bookinglist.splice(duplicateIndex, 1);
      }

      let selectionData = {} as BookingFurniture;
      selectionData.furniture = {} as Furniture;
      selectionData.furniture.furnitureId = id;
      selectionData.count = count;
    //  this.user.type="donor";

      if (this.type == "donor") {

        this.bookinglist.push(selectionData);
        console.log(this.bookinglist);

      } else if (this.type == "student") {

        let index = this.furnitureKeyValue.findIndex(x => x.furniture.furnitureId == id);
        if (count > this.furnitureKeyValue[index].count) {

          this.bookinglist.push(selectionData);
          console.log(this.bookinglist);

        } else {
          let stock = this.furnitureKeyValue[index].count - count;
          alert("We currently have " + stock + "items of this furniture available");
        }
      }
    
  }
  
 
  createBooking(input)
  {

    

    let booking=   {} as Booking ;
    booking.event = {} as Event;
    booking.person = {} as User;
    booking.event.eventId=input.eventName;
    booking.person.userId= this.userId;
    booking.timeSlot= input.timeSlot;
    booking.bookedFurniture = this.bookinglist;
    console.log(booking);

    // booking.person.fname = "donor";
    // booking.person.type = "donor";

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
