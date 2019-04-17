import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {

  rForm: FormGroup;
  name: string;
  description: string;
  date: string;

  constructor(private formBuilder: FormBuilder, private eventService :EventService ) 
  {

    this.rForm = this.formBuilder.group(
      {
        'name': ["",[Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
        'description': ["",[Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
        'date': ["",Validators.required]
      }
    );

   }

  ngOnInit() {
  }

  createEvent(input)
  {
    console.log(input);
    this.eventService.createEvent(input);
    this.rForm.reset();

  }
}
