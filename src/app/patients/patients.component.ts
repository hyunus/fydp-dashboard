import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css', '../home/home.component.css']
})
export class PatientsComponent implements OnInit {

  user: object={};

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
  }

}
