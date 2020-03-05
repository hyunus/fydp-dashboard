import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './_helpers/auth.interceptor'
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamedataComponent } from './gamedata/gamedata.component';
import {HttpClientModule } from '@angular/common/http'
import {GoogleChartsModule} from 'angular-google-charts';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimelineFilterBarChartComponent } from './timeline-chart/timeline-filter-bar-chart.component'
import { ChartModule } from 'angular-highcharts'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import {   
  MatButtonModule,  
  MatChipsModule,
  MatCheckboxModule,
  MatMenuModule,  
  MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  MatDatepickerModule,  
  MatDividerModule, 
  MatNativeDateModule,  
  MatRadioModule,  
  MatSelectModule,  
  MatOptionModule,  
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule, 
  MatGridListModule
  } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';  
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { TagFilterPipe } from './tag-filter.pipe';

const avatarColors = ["#CA98F1", "#3B47B5", "#DD4573"]  

@NgModule({
  declarations: [
    AppComponent,
    GamedataComponent,
    LoginComponentComponent,
    HomeComponent,
    PatientsComponent,
    ProfileComponent,
    TimelineFilterBarChartComponent,
    GamesComponent,
    AddProgramComponent,
    TagFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MatButtonModule,  
    MatChipsModule,
    MatCheckboxModule,
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    BrowserAnimationsModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatDatepickerModule,  
    MatDividerModule,
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,  
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    AppRoutingModule //needs to stay at the bottom
  ],
  providers: [{
    //intercept every HTTP request and attach token
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    //hash routing strategy
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
