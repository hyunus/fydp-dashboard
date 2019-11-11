import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gamedata',
  templateUrl: './gamedata.component.html',
  styleUrls: ['./gamedata.component.css']
})
export class GamedataComponent implements OnInit {
  gameData;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getGameData().subscribe((data)=>{
      console.log(data);
      this.gameData = data['records'];
    });
  }

}
