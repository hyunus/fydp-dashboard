import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css', '../home/home.component.css']
})
export class GamesComponent implements OnInit {

  user: Object;
  gameList: Array<Object>

  constructor(private apiService: ApiService) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    //call game list from backend
    this.apiService.getGamelist().subscribe((response) => {
      console.log(response);
      this.gameList = response['records']
    })
  }

}
