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
  // phonenumber: string;
  password: string;
  cpassword: string;
  type: string;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) 
  {

    this.rForm = this.formBuilder.group(
      {
        'fname': ["",[Validators.required, Validators.maxLength(25)]],
        'lname': ["",[Validators.required, Validators.maxLength(25)]],
        'emailid': ["",[Validators.required, Validators.maxLength(30)]],
        // 'phonenumber': ["",[Validators.required, Validators.maxLength(10)]],
        'password': ["",[Validators.required, Validators.maxLength(13),  Validators.minLength(8)]],
        'cpassword': ["",[Validators.required, Validators.maxLength(13), Validators.minLength(8)]],
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
