import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseUrl = environment.apiUrl + '/devices';

  constructor(private http: HttpClient) { }

  // ===== MACHINE =====
  createDevice(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getDevices(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getDevices`, data);
  }

  updateDevice(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  deleteDevice(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  printData1(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/printData/${id}`);
  }
  printData(location: any) {
    return this.http.get(
      `${this.baseUrl}/printData/${location}`,
      {
        responseType: 'blob'
      }
    );
  }
}