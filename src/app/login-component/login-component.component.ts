import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  regiForm: FormGroup;
  Email:string='';
  Password:string='';
  IsAccepted:number=0;

  constructor(private fb: FormBuilder) { 
    //initialize FormGroup
    this.regiForm = fb.group({
      'Email': [null, Validators.compose([Validators.required,Validators.email])],
      'Password': [null, Validators.required]
    })
  }
  
  onFormSubmit(form:NgForm)  
  {  
    console.log(form);  
  }  

  ngOnInit() {
  }

}
