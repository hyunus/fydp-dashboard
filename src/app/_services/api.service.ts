import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

//Class that pulls data from API
export class ApiService {

  API_URL = "https://prd-sql01.ddns.net/dashboard"

  constructor(private httpClient: HttpClient) {}

  public addPatient(patient: Object, OT:string) {
    let url = this.API_URL+"/create_patient?ot_code="+OT;
    return this.httpClient.post(url, patient);
  }

  public getPatient(OT:string) {
    let url = this.API_URL+"/read_patient?ot_code="+OT;
    return this.httpClient.get(url);
  }
}
