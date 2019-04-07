import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/services/sign-up.service';
import { User } from '../../models/user';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  // add this config
  settings = {
    columns: {
      fname: {
        title: 'First Name'
      },
      lname: {
        title: 'Last Name'
      },
      emailid: {
        title: 'Email Address'
      },
      phonenumber: {
        title: 'Phone Number'
      }
    }
  };
  constructor(private signUpService: SignUpService) { }

  ngOnInit() 
  {

    this.signUpService.fetchAllUsers().subscribe(users => {
      this.users = users;
      
    });
 
  }

}
