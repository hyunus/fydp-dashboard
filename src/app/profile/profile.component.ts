import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../home/home.component.css']
})
export class ProfileComponent implements OnInit {

  patient: string;
  profile = {};
  user: Object;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id']
    })

    //get patient profile from backend
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0]
      console.log(this.profile)
    })
  }

}
