import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { _ } from 'underscore';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner'

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
  noData = false;

  //adherence chart options

  chart = new Chart({
    chart: {
      type: 'column',
      zoomType: 'x',
      panning: {
        enabled: true,
        type: 'x'
      },
      panKey: 'shift',
      style: {
        fontFamily: 'Archivo',
        fontSize: "20px",
        color: "rgba(0, 0, 0, 0.87)"
      },
    },
    credits: {
      enabled: false
    },
    colors: ["#DD4573", "#3B47B5", "#CA98F1"],
    title: {
      text: ""
    },
    xAxis: {
      type: 'datetime',
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        style: {
          fontSize: "20px",
          color: "rgba(0, 0, 0, 0.87)"
        }
      },
      lineWidth: 1,
      lineColor: "black",
      tickColor: "black",
    },
    yAxis: {
      title: {
        text: 'Sessions',
        align: "low",
        style: {
          color: "#000000"
        }
      },
      labels: {
        style: {
          fontSize: "20px",
          color: "rgba(0, 0, 0, 0.87)"
        }
      },
      gridLineColor: 'transparent',
      lineWidth: 0,
      minorGridLineWidth: 0,
      allowDecimals: false
    },
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        return 'DATE: ' + new Date(this.x).toString().slice(3, 15) + "<br> GAME: " + this['game_title'].replace(/_/g, ' ') + "<br> SESSIONS: " + this.y
      }
    },
    legend: {
      enabled: true,
      align: "right",
      itemStyle: {
        fontSize: "16px",
        fontWeight: "normal",
        color: "rgba(0, 0, 0, 0.6)"
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      },
    }
  })

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
   }

   logOut() {
    localStorage.setItem('currentUser', "");
    window.location.href="/#login"
  }

   goPatients() {
     window.location.href='/#patients'
   }

   goAddProgram() {
    window.location.href=`/#addprogram?id=${this.patient}`
   }

   goGameData(game) {
     window.location.href=`/#gamedata?id=${this.patient}&game=${game['game_title']}`
   }

  ngOnInit() {
    this.spinner.show()
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
            name: records.indexOf(record)+1,
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
      this.noData = true;
      setTimeout(() => {
        this.spinner.hide()
      }, 500)
    })

    //get patient profile from backend
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0];
      this.profile['goals'] = this.profile['goals'].split(",")
      this.profile['assignments'].forEach((assign) => {
        assign['homework'] = JSON.parse(assign['homework'])
      });

      console.log(this.profile);

      //get game list from backend
      this.apiService.getGamelist().subscribe((response2) => {

        setTimeout(() => {
          this.spinner.hide()
        }, 500)
        this.gameList = response2['records'];      

      //assemble game tiles from game list & patient assignments
      if(this.profile['assignments'].length) {
        this.profile['assignments'].forEach(element => {
          let game = element['game_title'];
          game = this.gameList.find(i => i.game_title === game);
          if (game) {
            game['homework'] = element['homework'] //add homework to game tile
            this.gameTiles.push(game);
          }
        });
        console.log(this.gameTiles)
        this.gameTiles.forEach((game) => {
          game['game_title'] = game['game_title'].replace(/_/g, ' '); //replace underscore with space
          game['icon'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
          + game['icon']);
        });
        }
      }, (error) => {
        console.log(error);
        setTimeout(() => {
          this.spinner.hide()
        }, 500)
      })         
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.spinner.hide()
      }, 500)
    })
  }

}
