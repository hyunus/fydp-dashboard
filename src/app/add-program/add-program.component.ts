import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css', '../home/home.component.css', '../profile/profile.component.css', '../games/games.component.css', '../patients/patients.component.css'],
  providers: [DatePipe]
})
export class AddProgramComponent implements OnInit {

  user: Object;
  patient: string;
  profile: {};
  gameList: Array<Object>;
  query: string="";
  programForm: FormGroup;
  today: string;
  min_date: Date;
  selected_game: Object;

  //form controls
  no_sessions: Number;
  no_occurrences: Number;
  cadence: String="";
  no_duration: Number;
  duration: String="";
  ends: String="";
  on_date: Date;
  no_after: Number;

  constructor(private route: ActivatedRoute, 
    private apiService: ApiService,
    private fb: FormBuilder, 
    private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.programForm = fb.group({
      'no_sessions': [null, Validators.compose([Validators.required,Validators.min(1)])],
      'no_occurrences': [null, Validators.compose([Validators.required,Validators.min(1)])],
      'cadence': ["days"],
      'no_duration': [null, Validators.compose([Validators.required,Validators.min(1)])],
      'duration': ["mins", Validators.required],
      'ends': ["never", Validators.required],
      'on_date': [null],
      'no_after': [null]
    });
    this.min_date = new Date();
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.selected_game = {
      game_title: ""
    };
    this.profile = {
      firstName: ""
    };
   }

   goProfile() {
    window.location.href=`/#profile?id=${this.patient}`
  }

  assignProgram(form: Object) {
    //build homework data object
    let hw_data = {
      "homework": JSON.stringify(form),
      "game_title": this.selected_game['game_title'].replace(/ /g, '_'), //restore underscore in game title
      "task": "",
      "completed": ""
    }

    this.apiService.assignHomework(this.user['code'], this.patient, hw_data).subscribe((response) => {
      console.log(response);
      window.location.href=`/#profile?id=${this.patient}`
    }, (error) => {
      console.log(error)
    });
  }

  selectGame(game: Object) {
    this.selected_game = game;
    console.log(this.selected_game)
  }

  removeSelectedGame() {
    this.selected_game = {
      game_title: ""
    }
  }

  getFromLine() {
    console.log(this.profile);
    let from = `To: ${this.profile['recipient_name']} (${this.profile['recipient_email']})`;
    return from;
  }

  ngOnInit() {
    //get patient uid from query params
    this.route.queryParams
    .subscribe(params => {
      this.patient = params['id'];
      //get patient profile
      this.apiService.getProfile(this.user['code'], this.patient).subscribe((response) => {
        this.profile = response['records'][0];
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error)
    })

    //get game list
    this.apiService.getGamelist().subscribe((response) => {
      this.gameList = response['records']
      this.gameList.forEach((game) => {
        game['game_title'] = game['game_title'].replace(/_/g, ' ');
      })
      console.log(this.gameList)
    }, (error) => {
      console.log(error)
    })
  }

}
