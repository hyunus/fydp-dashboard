import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';


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
  data = [
    {
      "name": "2016-09-12T17:08:25.009Z",
      "data": 209
    },
    {
      "name": "2016-09-13T17:08:25.009Z",
      "data": 0
    },
    {
      "name": "2016-09-14T17:08:25.009Z",
      "data": 134
    },
    {
      "name": "2016-09-15T17:08:25.009Z",
      "data": 232
    },
    {
      "name": "2016-09-16T17:08:25.009Z",
      "data": 129
    },
    {
      "name": "2016-09-17T17:08:25.009Z",
      "data": 178
    },
    {
      "name": "2016-09-18T17:08:25.009Z",
      "data": 21
    },
    {
      "name": "2016-09-19T17:08:25.009Z",
      "data": 290
    },
    {
      "name": "2016-09-20T17:08:25.009Z",
      "data": 136
    },
    {
      "name": "2016-09-21T17:08:25.009Z",
      "data": 131
    }
  ]

  //chart options

  chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: ""
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: '# of Sessions Played'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        color: '#29DD9C'
      }
    },
    series: [
      {
        type: 'column',
        data: [
          [Date.UTC(2012, 5, 22, 8, 15), 2], 
          [Date.UTC(2012, 5, 23, 8, 20), 1], 
          [Date.UTC(2012, 5, 24, 8, 25), 4]
        ]
      }
    ]
  })

  // view: any[] = [700, 250];
  // autoScale = false;
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showXAxisLabel = false;
  // showYAxisLabel = false;

  // colorScheme = {
  //   domain: ['#29DD9C']
  // }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    //get patient uid from query params
    //comment
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
