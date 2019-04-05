import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  rForm: FormGroup;
  fname: string;
  lname: string;
  emailid: string;
  phonenumber: string;
  password: string;
  cpassword: string;
  type: string;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) 
  {

    this.rForm = this.formBuilder.group(
      {
        'fname': ["",Validators.required],
        'lname': ["",Validators.required],
        'emailid': ["",Validators.required],
        'phonenumber': ["",Validators.required],
        'password': ["",Validators.required],
        'cpassword': ["",Validators.required],
        'type': ["",Validators.required]
       
      }
    );
   }

  ngOnInit() {
  }

  signUp(input)
  {
    console.log(input);
    this.signUpService.signUp(input);
    this.rForm.reset();
  }
}
