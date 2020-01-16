import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-gamedata',
  templateUrl: './gamedata.component.html',
  styleUrls: ['./gamedata.component.css']
})
export class GamedataComponent implements OnInit {
  //retrieved data properties
  gameData;

  //google chart properties
  title = 'Accuracy';
  type = 'ColumnChart';
  data = [['A', 3], ['B', 4], ['C', 5]] ;
  width = 800;
  height = 400;



  //data = [['A', 81.76286090720873], ['B', 82.24383116883116], ['C', 82.58051948051947]] ;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    //get data from backend
    // this.apiService.getGameData().subscribe((data)=>{
    //   console.log(data);
    //   this.gameData = data['records'];
    // });
  }

}
