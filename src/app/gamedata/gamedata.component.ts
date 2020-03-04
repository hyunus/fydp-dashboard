import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
declare var Rainbow: any;

@Component({
  selector: 'app-gamedata',
  templateUrl: './gamedata.component.html',
  styleUrls: ['./gamedata.component.css', '../home/home.component.css', '../profile/profile.component.css'],
  providers: [DatePipe]
})
export class GamedataComponent implements OnInit {

  user: Object;
  patient: string;
  game_title: string;
  game_info: {};
  profile: {};
  rainbow: any;

  //graph options
  chart = new Chart({
    chart: {
      type: 'scatter',
      zoomType: 'x',
      panning: {
        enabled: true,
        type: 'x'
      },
      panKey: 'shift'
    },
    title: {
      text: ""
    },
    xAxis: {
      title: {
        text: "Sessions"
      }
    },
    yAxis: {
      title: {
        text: 'Level Achieved'
      }
    },
    colorAxis: {
      minColor: "rgba(0, 0, 0, 0.1)",
      maxColor: "#DD4573"
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
            return 'ACCURACY: ' + this['accuracy'] + '<br> LEVEL: ' + this.y + '<br> SESSION: ' + this.name
          },
          headerFormat: ''
        }
      }
    }
  })

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
    ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //settings for color gradient
    this.rainbow = new Rainbow();
    this.rainbow.setSpectrum('#ebe8e9', '#DD4573')
    this.rainbow.setNumberRange(1, 10)
    }

  //function to get color for data point based on percentage accuracy
  getColor(number: number) {
    number = number * 10;
    number = Math.round(number)
    if  (!number) {
      number = 1;
    }
    console.log(number)
    return '#' + this.rainbow.colorAt(number);
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
      this.game_title = params['game']
    })

    //get client profile
    this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
      this.profile = response['records'][0]

      this.apiService.getGameData(this.user['code'], this.patient, this.game_title.replace(/ /g, '_')).subscribe((response) => {
        console.log(response);
        //format data
        let records = response['records'];
        if(records.length) {
          var performance = records.map((record: Object) => {
            let accuracy = (Number(record['successes']) / (Number(record['successes']) + Number(record['failures'])))
            return {
              name: record['id'],
              y: Number(record['levelCount']),
              accuracy: (accuracy*100).toFixed(0).toString() + "%",
              date: record['created'],
              color: this.getColor(accuracy)
            }
          })
          console.log(performance);
          //set chart data
          this.chart.addSeries({
            type: 'scatter',
            data: performance
          }, true, false)
        }
      })
    })

    //read gamelist and get data for this game
    this.apiService.getGamelist().subscribe((response) => {
      console.log(response)
      this.game_info = response['records'].find(i => i.game_title === this.game_title.replace(/ /g, '_'));
      console.log(this.game_info)
    })
  }

}
