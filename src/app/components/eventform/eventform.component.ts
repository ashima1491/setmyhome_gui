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
        'name': ["",Validators.required],
        'description': ["",Validators.required],
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
