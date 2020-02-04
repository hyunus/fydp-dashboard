import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormControl } from '@angular/forms'
import { ApiService } from "../_services/api.service"
import { Router } from "@angular/router"

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
  goals: string="";

  //patient list 
  patients: Array<Object>=[];

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private router: Router) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //assigning add patient form properties
    this.patientForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.email],
      'parentEmail': [null, Validators.compose([Validators.required, Validators.email])],
      'conditions': [null, Validators.required],
      'goals': [null, Validators.required],
    })
   }

   toggleView() {
    this.addView = !this.addView;
   }

   addPatient(form:Object) {
      this.apiService.addPatient(form, this.user['code']).subscribe((response) => {
        this.patients = response['records'];
        this.toggleView();
      },
      error => {
        console.log(error);
      })
   }

   getPatients() {
     this.apiService.getPatient(this.user['code']).subscribe((response) => {
       this.patients = response['records'];
     },
     error => {
       console.log(error);
     })
   }

   goProfile(uid: string) {
      // this.router.navigate(['/#profile'], {queryParams: {id: uid}});
      window.location.href=`/#profile?id=${uid}`
    }

  ngOnInit() {
    this.getPatients();
  }
}
