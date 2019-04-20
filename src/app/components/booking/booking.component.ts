import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FurnitureService } from 'src/app/services/furniture.service';
import { Furniture } from 'src/app/models/furniture';
import { Bookingviewmodel } from 'src/app/models/bookingviewmodel'


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
  bookinglist: Array<Bookingviewmodel>;
  furnitureKeyValue: Array<Bookingviewmodel>;
  userName: string;
  userType: string;
  
  events: Event[];
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private userService: UserServiceService
    , private furnitureService: FurnitureService)
  
  { 
    this.getAllEvents();
    this.getHeavy("Heavy");
    this.getMedium("Medium");
    this.getSmall("Small");
    this.bookinglist = [];
    this.furnitureKeyValue = [{ furnitureName: "Couch", count: 5 }, { furnitureName: "Table", count: 5}];

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

  changeEvent(count, name) {

    if (this.userName != null) {

      let selectionData = {} as Bookingviewmodel;
      selectionData.furnitureName = name;
      selectionData.count = count;

      if (this.userType == "donor") {

        this.bookinglist.push(selectionData);
        console.log(this.bookinglist);

      } else if (this.userType == "student") {

        let index = this.furnitureKeyValue.indexOf(name);
        if (count > this.furnitureKeyValue[index].count) {

          this.bookinglist.push(selectionData);
          console.log(this.bookinglist);

        } else {
          let stock = this.furnitureKeyValue[index].count - count;
          alert("We currently have " + stock + "items of this furniture available");
        }
      }
    }  
  }
  
  ngOnInit() {
    this.userService.subject.subscribe(user => {
      console.log(user);
      if (null != user) {
        this.userName = user.fname;
        this.userType = user.type;
      }

    })
  }

  createBooking(input)
  {

    
    console.log(this.rForm.controls['heavyFurnitureName'].value);
    console.log(this.rForm.get('heavyFurnitureName').value);
 
    var booking: Booking;
    booking = input;
    booking.bookingviewmodel = this.bookinglist;
    console.log(booking);

    booking.userName = "donor";
    booking.userType = "donor";

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
