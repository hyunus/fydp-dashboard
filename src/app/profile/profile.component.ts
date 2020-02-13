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
  adherence = [];

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
    }
  })

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

    //get total adherence from backend
    this.apiService.getAdherence(this.user['code'], 'Trail_It', this.patient).subscribe((response) => {
      let records = response['records'];
      if(records.length) {
        //parse records into data array
        var adherence = records.map(function(record) {
          return [Date.parse(record['created']), Number(record['count'])]
        });
        // add adherence data to chart
        this.chart.addSeries({
          type: 'column',
          name: "Trail It",
          data: adherence
        }, true, false)
      }
    }, error => {
      console.log(error);
    })

    //get patient profile from backend
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];

      //get game list from backend
      this.apiService.getGamelist().subscribe((response2) => {
      this.gameList = response2['records'];

      //assemble game tiles from game list & patient assignments NEEDS TO MOVE TO LOGIC SERVICE
      if(this.profile['assignments']) {
        this.profile['assignments'].forEach(element => {
          let game = element['game_title'];
          game = this.gameList.find(i => i.game_title === game);
          this.gameTiles.push(game);
        });
      }
      })         
    })
  }

}
