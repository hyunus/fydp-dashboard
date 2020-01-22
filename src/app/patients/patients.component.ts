import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css', '../home/home.component.css']
})
export class PatientsComponent implements OnInit {

  user: object={};
  searchForm: FormGroup;
  query: string="";

  addView: boolean=false;
  //form properties
  patientForm: FormGroup;
  firstName: string="";
  lastName: string="";
  email: string="";
  parentEmail: string="";
  conditions: string="";
  goals: string=""

  constructor(private fb: FormBuilder) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.searchForm = fb.group({
      'query': [null]
    })
    this.patientForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.email],
      'parentEmail': [null, Validators.compose([Validators.required, Validators.email])],
      'conditions': [null, Validators.required],
      'goals': [null, Validators.required]
    })
   }

   toggleView() {
    this.addView = !this.addView;
   }

   addPatient(form:NgForm) {
     //placeholder for posting the form to the patient API
     console.log(form);
     this.toggleView();
   }

  ngOnInit() {
  }

}
