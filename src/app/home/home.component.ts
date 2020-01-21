import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object={};
  articles: Array<object>=[];

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //hard-coded article list for testing purposes
    this.articles = [
      {
        title: "See how Mightier is using video games to teach kids emotion calming skills",
        subtitle: "Teaching Kids Self-Regulation Through Play",
        link: "MIGHTIER GAMES",
        img: "/assets/article1.png"
      },
      {
        title: "See Pluto Care's new outpatient adherence tracking features",
        subtitle: "Timeline, Performance, and Homework",
        link: "OUTPATIENT ADHERENCE",
        img: "/assets/article2.png"
      }
    ]
   }

  ngOnInit() {
  }

}
