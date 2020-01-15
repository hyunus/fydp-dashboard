import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

//Class that pulls data from API
export class ApiService {
  API_CRED = "Basic " + window.btoa("Shadbolt:Youth_cup2011");
  API_URL = "https://prd-sql01.ddns.net/api/entry/read.php"
  HEADERS = new HttpHeaders({
    'Authorization': this.API_CRED, 
    'Content-Type': 'application/json'
  })

  constructor(private httpClient: HttpClient) {}

  public getGameData() {
    return this.httpClient.get(this.API_URL, {
      headers: this.HEADERS
    })
  }
}
