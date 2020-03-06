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
        title: "How Mightier is using video games to teach kids emotion calming skills",
        subtitle: "Teaching Kids Self-Regulation Through Play",
        link: "MIGHTIER GAMES",
        url: "/",
        img: "/assets/article1.png"
      },
      {
        title: "See Pluto Care's new outpatient adherence tracking features",
        subtitle: "Timeline, Performance, and Homework",
        link: "OUTPATIENT ADHERENCE",
        url: "/#patients",
        img: "/assets/article2.png"
      },
      {
        title: "NEW GAME: Rec Room for environment organization",
        subtitle: "Rec Room has partnered with Pluto Care to release an occupational therapy version of their titular VR game Rec Room. This features multiple rooms for exploration, organization, and fun!",
        link: "REC ROOM",
        url: "/#games",
        img: "/assets/article3.png"
      },
      {
        title: "Hand VR Exergame for Occupational Health Care",
        subtitle: "Researchers develop a hand motion-based virtual reality-based exergame for children to prevent some of the muskoloskeletal problems associated with the over-use of keyboards and mobile devices.",
        link: "ONTARIO TECH UNIVERSITY",
        url: "/",
        img: "/assets/article4.png"
      }
    ]
   }

   logOut() {
    localStorage.setItem('currentUser', "");
    window.location.href="/#login"
  }

  ngOnInit() {
  }

}
