import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamedataComponent } from './gamedata/gamedata.component';
import {HttpClientModule } from '@angular/common/http'
import {GoogleChartsModule} from 'angular-google-charts';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import {   
  MatButtonModule,  
  MatMenuModule,  
  MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  MatDatepickerModule,  
  MatDatepicker,  
  MatNativeDateModule,  
  MatRadioModule,  
  MatSelectModule,  
  MatOptionModule,  
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule, 
  MatList} from '@angular/material';
import { HomeComponent } from './home/home.component'


@NgModule({
  declarations: [
    AppComponent,
    GamedataComponent,
    LoginComponentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    BrowserAnimationsModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,  
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
