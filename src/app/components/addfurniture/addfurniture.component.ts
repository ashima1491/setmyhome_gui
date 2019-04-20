import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/services/furniture.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-addfurniture',
  templateUrl: './addfurniture.component.html',
  styleUrls: ['./addfurniture.component.css']
})
export class AddfurnitureComponent implements OnInit {

    rForm: FormGroup;
    category: string;
    furnitureName: string;

  constructor(private furnitureService: FurnitureService, private formBuilder: FormBuilder) {


    this.rForm = this.formBuilder.group(
      {
       
        'category': ["Heavy",[Validators.required]],
        'furnitureName': [null,[Validators.required]]
        
       
      }
    );
  }
  

  ngOnInit() {
      
  }
  
  addfurniture(input){ 
    console.log(input);
    this.furnitureService.addFurniture(input);
    this.rForm.reset();
  
  }

 


}
