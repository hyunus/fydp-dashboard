import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
declare var Rainbow: any;

@Component({
  selector: 'app-gamedata',
  templateUrl: './gamedata.component.html',
  styleUrls: ['./gamedata.component.css', '../home/home.component.css', '../profile/profile.component.css'],
})
export class GamedataComponent implements OnInit {

  user: Object;
  patient: string;
  game_title: string;
  game_info: {};
  profile: {};
  rainbow: any;
  noData= false;

  //graph options
  chart = new Chart({
    chart: {
      type: 'scatter',
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
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      title: {
        text: "Session",
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
      lineWidth: 1,
      lineColor: "black",
      tickColor: "black",
      allowDecimals: false
    },
    yAxis: {
      title: {
        text: 'Level Achieved',
        align: "high",
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
      lineWidth: 1,
      lineColor: "black",
      tickWidth: 1,
      tickColor: "black",
      allowDecimals: false,
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 12
        },
        tooltip: {
          pointFormatter: function() {
            return 'ACCURACY: ' + this['accuracy'] + '<br> LEVEL: ' + this.y + '<br> DATE:' + new Date(this['date']).toString().slice(3, 15) + '<br> SESSION: ' + this.name
          },
          headerFormat: ''
        },
        pointStart: 1
      }
    }
  })

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _sanitizer: DomSanitizer
    ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

  logOut() {
    localStorage.setItem('currentUser', "");
    window.location.href="/#login"
  }

  goProfile() {
    window.location.href=`/#profile?id=${this.patient}`
  }

  //function to get color for data point based on percentage accuracy
  getColor(number: number) {
    number = number * 10;
    number = Math.round(number)
    // if  (!number) {
    //   number = 1;
    // }
    return '#' + this.rainbow.colorAt(number);
  }

  ngOnInit() {
    this.spinner.show()
    //settings for color gradient
    this.rainbow = new Rainbow();
    this.rainbow.setSpectrum('#ebe8e9', '#DD4573')
    this.rainbow.setNumberRange(1, 10)

    //get query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
      this.game_title = params['game']
    })

    //get client profile
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0]

      this.apiService.getGameData(this.user['code'], this.patient, this.game_title.replace(/ /g, '_')).subscribe((response) => {
        //format data
        let records = response['records'];
        if(records.length) {
          var performance = records.map((record: Object) => {
            let accuracy = (Number(record['successes']) / (Number(record['successes']) + Number(record['failures'])))
            return {
              name: records.indexOf(record)+1,
              y: Number(record['levelCount']),
              accuracy: (accuracy*100).toFixed(0).toString() + "%",
              date: record['created'],
              color: this.getColor(accuracy)
            }
          })
          //set chart data
          this.chart.addSeries({
            type: 'scatter',
            data: performance
          }, true, false)
          setTimeout(() => {
            this.spinner.hide()
          }, 2000)
        }
      }, (error) => {
        console.log(error);
        this.noData = true;
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
      })
    }, (error) => {
      console.log(error);
      setTimeout(() => {
        this.spinner.hide()
      }, 2000)
    });

    //read gamelist and get data for this game
    this.apiService.getGamelist().subscribe((response) => {
      this.game_info = response['records'].find(i => i.game_title === this.game_title.replace(/ /g, '_'));

      //decode image
      console.log(this.game_info)
      this.game_info['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.game_info['image']);
    }, (error) => {
      console.log(error)
    })
  }

}
