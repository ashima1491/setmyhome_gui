import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  isAdmin: boolean;
  userId: string;
 

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
 
    this.userService.subject.subscribe(user=>
      {
        console.log(user);
         
          this.username= null==user?"": user.fname;
          this.isAdmin= null==user? false:user.type=='admin';
          this.userId= null==user?"": user.userId;
      });
 
    if(this.userService.isLogged())
    {
      this.username= this.userService.getFname();
      this.isAdmin= this.userService.isAdmin();
      this.userId= this.userService.getUserId();

    }

  }

}
