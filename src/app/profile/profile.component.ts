import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { _ } from 'underscore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../home/home.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {

  patient: string;
  profile = {};
  user: Object;
  gameList = [];
  gameTiles = [];
  adherence = [];
  today: string;

  //adherence chart options

  chart = new Chart({
    chart: {
      type: 'column',
      zoomType: 'x',
      panning: {
        enabled: true,
        type: 'x'
      },
      panKey: 'shift'
    },
    colors: ["#DD4573", "#3B47B5"],
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
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        return 'DATE: ' + new Date(this.x).toString().slice(3, 15) + "<br> GAME: " + this['game_title'] + "<br> SESSIONS: " + this.y
      }
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    }
  })

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
   }

   goAddProgram() {
    window.location.href=`/#addprogram?id=${this.patient}`
   }

   goGameData(game) {
     window.location.href=`/#gamedata?id=${this.patient}&game=${game['game_title']}`
   }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
    })

    //get total adherence from backend
    this.apiService.getAdherence(this.user['code'], this.patient).subscribe((response) => {
      let records = response['records'];
      console.log(records)
      if(records.length) {
        //parse records into data array
        var adherence = records.map(function(record) {
          return {
            name: records.indexOf(record),
            x: Date.parse(record['created']),
            y: Number(record['count']),
            game_title: record['game_title']
          }
        });

        console.log(adherence)
        //separate data by game
        let groups = _.groupBy(adherence, "game_title")
        for (var prop in groups) {
          if (Object.prototype.hasOwnProperty.call(groups, prop)) {
            // add adherence data to chart
            this.chart.addSeries({
              type: 'column',
              name: groups[prop][0]['game_title'].replace(/_/g, ' '),
              data: groups[prop]
            }, true, false)
          }
      }
      }
    }, error => {
      //show placeholder for graph
      console.log(error);
    })

    //get patient profile from backend
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];
      this.profile['goals'] = this.profile['goals'].split(",")
      this.profile['assignments'].forEach((assign) => {
        assign['homework'] = JSON.parse(assign['homework'])
      });

      //get game list from backend
      this.apiService.getGamelist().subscribe((response2) => {
      this.gameList = response2['records'];      

      //assemble game tiles from game list & patient assignments
      if(this.profile['assignments'].length) {
        this.profile['assignments'].forEach(element => {
          let game = element['game_title'];
          game = this.gameList.find(i => i.game_title === game);
          game['homework'] = element['homework'] //add homework to game tile
          this.gameTiles.push(game);
        });
        this.gameTiles.forEach((game) => {
          game['game_title'] = game['game_title'].replace(/_/g, ' '); //replace underscore with space
        });
        }
      })         
    })
  }

}
