import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gamedata',
  templateUrl: './gamedata.component.html',
  styleUrls: ['./gamedata.component.css', '../home/home.component.css']
})
export class GamedataComponent implements OnInit {

  user: Object;
  patient: String;
  game_title: String;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
      this.game_title = params['game']
    })
    console.log(this.patient)
    console.log(this.game_title)
  }

}
