import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class materialService {

  private baseUrl = environment.apiUrl + "/material";

  constructor(private http: HttpClient) { }

  // ===== MATERIAL =====
  // createMaterial(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/createAndon`, data);
  // }
  getTransactionFlow(flowCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getTransactionFlow/${flowCode}`);
  }

  getMaterialRequest(flowCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getMaterialRequest/${flowCode}`);
  }

  createMaterialRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createMaterialRequest`, data);
  }

}