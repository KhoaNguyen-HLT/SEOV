import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AndonService {

  private baseUrl = 'http://localhost:8080/seov/andon';

  constructor(private http: HttpClient) { }

  // ===== ANDON =====
  // createAndon(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/createAndon`, data);
  // }

  getLines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLines`);
  }
}