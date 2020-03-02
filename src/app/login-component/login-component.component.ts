import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms'
import { AuthService } from '../_services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css', '../home/home.component.css']
})
export class LoginComponentComponent implements OnInit {

  regiForm: FormGroup;
  email: string='';
  password: string='';
  error: string='';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { 
    this.regiForm = fb.group({
      'email': [null, Validators.compose([Validators.required,Validators.email])],
      'password': [null, Validators.required]
    })
  }

  onFormSubmit(form:NgForm)  
  {  
    this.authService.login(form).subscribe((response) => {
      localStorage.setItem('currentUser', JSON.stringify(response))
      this.router.navigate(["/"]);
    },
    //still need to surface this error to the user
    error => this.error = error
    )
  }  

  ngOnInit() {
  }

}
