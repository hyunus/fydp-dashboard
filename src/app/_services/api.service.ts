import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

//Class that pulls data from API
export class ApiService {

  API_URL = "https://prd-sql01.ddns.net/dashboard"
  EMAIL_URL = "https://prd-sql01.ddns.net/email"

  constructor(private httpClient: HttpClient) {}

  public addPatient(patient: Object, OT:string) {
    let url = this.API_URL+"/create_patient?ot="+OT;
    return this.httpClient.post(url, patient);
  }

  public getPatient(OT:string) {
    let url = this.API_URL+"/read_patient?ot="+OT;
    return this.httpClient.get(url);
  }

  public getProfile(OT:string, patient: string) {
    let url = this.API_URL+`/read_homework?ot=${OT}&uid=${patient}`
    return this.httpClient.get(url)
  }

  public getGamelist() {
    let url = this.API_URL+'/read_gamelist'
    return this.httpClient.get(url)
  }

  public sendEmail(email: object) {
    let url = this.EMAIL_URL + "/send_program"
    return this.httpClient.post(url, email)
  }

  public assignHomework(OT: string, patient: string, homework: Object) {
    let url = this.API_URL+`/assign_homework?ot=${OT}&uid=${patient}`;
    return this.httpClient.post(url, homework);
  }

  public deleteHomework(OT: string, patient: string, game:string) {
    let url = this.API_URL+`/delete_homework?ot=${OT}&uid=${patient}&game=${game}&task=${"''"}`
    return this.httpClient.post(url, {})
  }

  public getAdherence(OT: string, patient: string) {
    let url = this.API_URL+`/total_adherence?ot=${OT}&uid=${patient}`
    return this.httpClient.get(url)
  }

  public getGameData(OT: string, patient: string, game: string) {
    let url = this.API_URL+`/read_gameplay?ot=${OT}&uid=${patient}&game=${game}`
    return this.httpClient.get(url);
  }
}
