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
  gameList = [];
  gameTiles = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
    })

    //get patient profile from backend
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];
      console.log(response);

      //get game list from backend
      this.apiService.getGamelist().subscribe((response2) => {
      this.gameList = response2['records'];

      //assemble game tiles from game list & patient assignments NEEDS TO MOVE TO LOGIC SERVICE
      this.profile['assignments'].forEach(element => {
        let game = element['game_title'];
        game = this.gameList.find(i => i.game_title === game);
        this.gameTiles.push(game);
      });
      console.log(this.gameTiles);         
      })         
    })
  }

}
