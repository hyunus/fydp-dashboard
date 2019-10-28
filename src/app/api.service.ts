import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_CRED = "Basic " + btoa("Shadbolt"+":"+"Youthcup2011")
  API_URL = "https://prd-sql01.ddns.net/api/entry/read.php"
  constructor(private httpClient: HttpClient) { }

  public getGameData() {
    let requestHeaders = new HttpHeaders({
      'Authorization': this.API_CRED, 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    return this.httpClient.get(this.API_URL, {
      headers: requestHeaders
    })
  }
}
