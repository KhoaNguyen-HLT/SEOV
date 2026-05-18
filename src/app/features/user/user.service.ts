import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) { }

  // ===== USER =====
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }
}