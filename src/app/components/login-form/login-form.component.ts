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
       
        'emailid': ["",[Validators.required, Validators.maxLength(100)]],
        'password': ["",[Validators.required, Validators.maxLength(13), Validators.minLength(8)]],
        
       
      }
    );
  }

  ngOnInit() {
  }

  login(input)
  {
    //console.log(input);
    this.signUpService.login(input).subscribe( u=> 
      {
        console.log(u);
        if(null!=u)
        {
          this.userService.setToken(u);
          /* if user is admin type, redirect to admin dashboard*/
          if(u.type=='admin')
          {
            this.router.navigateByUrl('/setMyHome/admin');
          }
          /* if user is not an admin type, redirect to non admin dashboard*/
          else
          {
            this.router.navigateByUrl('/setMyHome/nonadmin');
          }
        }
        else{
          alert("Invalid user credentials!");
        }
      })
  }
}
