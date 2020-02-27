import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css', '../home/home.component.css', '../profile/profile.component.css']
})
export class AddProgramComponent implements OnInit {

  user: Object;
  patient: string;
  profile: {};

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
      console.log(this.user['code'], this.patient)
    }, (error) => {
      console.log(error)
    })

    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];
      console.log(this.profile)
    }, (error) => {
      console.log(error);
    })
  }

}
