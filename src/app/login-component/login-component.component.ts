import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  regiForm: FormGroup;
  email: string='';
  password: string='';

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.regiForm = fb.group({
      'email': [null, Validators.compose([Validators.required,Validators.email])],
      'password': [null, Validators.required]
    })
  }

  onFormSubmit(form:NgForm)  
  {  
    this.authService.login(form).subscribe((response) => {
      console.log(response);
    })
  }  

  ngOnInit() {
  }

}
