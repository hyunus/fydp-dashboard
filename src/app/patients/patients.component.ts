import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css', '../home/home.component.css']
})
export class PatientsComponent implements OnInit {

  user: object={};
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

  //patient list 
  patients: Array<Object>=[];

  constructor(private fb: FormBuilder) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.patientForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.email],
      'parentEmail': [null, Validators.compose([Validators.required, Validators.email])],
      'conditions': [null, Validators.required],
      'goals': [null, Validators.required]
    })

    //placeholder patients list for testing purposes
    this.patients = [
      {
        firstName: "Jane",
        lastName: "Doe"
      },
      {
        firstName: "John",
        lastName: "Doe"
      },
      {
        firstName: "Alex",
        lastName: "Walker"
      },
      {
        firstName: "Rebecca",
        lastName: "Whitman"
      }
    ]
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
