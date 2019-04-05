import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    if(this.userService.isLogged)
    {
      this.username= this.userService.getFname();
    }

  }

}
