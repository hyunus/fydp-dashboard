import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = "https://prd-sql01.ddns.net/logins/login"
  HEADERS = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private httpClient: HttpClient) {}

  public login(credentials) {
    return this.httpClient.post(this.API_URL, credentials)
  }
}
