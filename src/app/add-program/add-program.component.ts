import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css', '../home/home.component.css', '../profile/profile.component.css', '../games/games.component.css', '../patients/patients.component.css']
})
export class AddProgramComponent implements OnInit {

  user: Object;
  patient: string;
  profile: {};
  gameList: Array<Object>;
  query: string="";

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
    }, (error) => {
      console.log(error)
    })

    //get patient profile
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];
    }, (error) => {
      console.log(error);
    })

    //get game list
    this.apiService.getGamelist().subscribe((response) => {
      this.gameList = response['records']
      console.log(this.gameList)
    }, (error) => {
      console.log(error)
    })
  }

}
