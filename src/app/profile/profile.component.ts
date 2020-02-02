import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  patient: string;
  OT: string;
  profile: Object;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.OT = JSON.parse(localStorage.getItem('currentUser'))['code']
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id']
    })

    //get patient profile from backend
    this.apiService.getProfile(this.OT, this.patient).subscribe((response) => {
      this.profile = response['records'][0]
      console.log(this.profile)
    })
  }

}
