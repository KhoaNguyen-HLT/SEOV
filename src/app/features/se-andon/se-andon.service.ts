import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AndonService {

  private baseUrl = 'http://192.168.2.11:8080/seov/andon';

  constructor(private http: HttpClient) { }

  // ===== ANDON =====
  // createAndon(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/createAndon`, data);
  // }

  getLines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLines`);
  }

  callGroup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/callgroup`, data);
  }

  updateProcessingStatus(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProcessingStatus/${id}`, {});
  }

  updateDoneStatus(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateDoneStatus/${id}`, {});
  }
}