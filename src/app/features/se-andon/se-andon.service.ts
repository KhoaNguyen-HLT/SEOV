import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AndonService {

  private baseUrl = environment.apiUrl + "/andon";

  constructor(private http: HttpClient) { }

  // ===== ANDON =====
  // createAndon(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/createAndon`, data);
  // }

  getLines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLines`);
  }

  getDataPending(siteCode: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getDataPending/${siteCode}`);
  }

  callGroup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/callgroup`, data);
  }

  updateProcessingStatus(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProcessingStatus/${id}`, {});
  }

  updateDoneStatus(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateDoneStatus/${id}`, data);
  }

  changeGroup(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/changeGroup`, data);
  }


  andonGetData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/andonGetData`, data);
  }

  sendRequest(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendRequest/${id}`, {});
  }

  andonDashboardData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/andonDashboardData`, data);
  }
}