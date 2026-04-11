import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/seov/users';

  constructor(private http: HttpClient) {}

  // ===== USER =====
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}