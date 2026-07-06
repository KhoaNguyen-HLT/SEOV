import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + "/users";
  private baseUrlAuth = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }

  // ===== USER =====
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserByUserName/${username}`);
  }



  getAllRole(): Observable<any> {
    return this.http.get(`${this.baseUrlAuth}/getAllRole`);
  }

  getDepartment(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getDepartment`);
  }

  getPosition(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getPosition`);
  }

  // User Role Management
  updateUserRole(payload: any) {
    return this.http.post(`${this.baseUrl}/updateUserRole`, payload);
  }


}