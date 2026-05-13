import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class qaService {

  private baseUrl = environment.apiUrl + "/qa/iqc";

  constructor(private http: HttpClient) { }

  // ===== ANDON =====
  // createAndon(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/createAndon`, data);
  // }

  getDataExcel(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getDataExcel`, formData);
  }

}