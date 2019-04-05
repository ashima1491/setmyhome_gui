import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import {Router} from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';




@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  rForm: FormGroup;
  emailid: string;
  
  password: string;
 
  
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,private signUpService: SignUpService, private router: Router) 
  
  { 

    this.rForm = this.formBuilder.group(
      {
       
        'emailid': ["",Validators.required],
        'password': ["",Validators.required],
        
       
      }
    );
  }

  ngOnInit() {
  }

  login(input)
  {
    console.log(input);
    this.signUpService.login(input).subscribe( u=> 
      
      
      {
        console.log(u);
        if(u.emailid!=null)
        {
          console.log("inide  ")
          this.userService.setToken(u.emailid);
          this.userService.setFname(u.fname);
          if(u.type=='admin')
          {
            console.log("navigating")
            this.router.navigateByUrl('/setMyHome/admin');

          }

          //if(u.type=='student')
          // this.router.navigateByUrl('/setMyHome/admin');

          //if(u.type=='donor')
          // this.router.navigateByUrl('/setMyHome/admin');
        }
      })
  }
}
