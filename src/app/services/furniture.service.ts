import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Furniture } from '../models/furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  // addFurniture(input) {
  //   // for local
  //   this.httpClient.post('https://fierce-woodland-50366.herokuapp.com/furniture/add', input).subscribe(r => {
  //     console.log(r);
  //     if ("true" == r.toString()) {
  //       alert("Furniture added successfully!");
  //       // this.router.navigateByUrl("/setMyHome/admin");
  //     }

  //   });

  // }


  addFurniture(input) {
    // for local
    this.httpClient.post('/api/furniture/add', input).subscribe(r => {
      console.log(r);
      if ("true" == r.toString()) {
        alert("Furniture added successfully!");
        // this.router.navigateByUrl("/setMyHome/admin");
      }

    });

  }

  getFurnitureList(category): Observable<Furniture[]> {

   return this.httpClient.get<Furniture[]>('/api/furniture/getByCategory/' + category)

  }

  // getFurnitureList(category): Observable<Furniture[]> {

  //   return this.httpClient.get<Furniture[]>('https://fierce-woodland-50366.herokuapp.com/furniture/getByCategory/' + category)

  // }
  
}
