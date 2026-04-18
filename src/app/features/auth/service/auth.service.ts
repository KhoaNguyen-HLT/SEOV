import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string[] = [];
  permissions: string[] = [];

  private API_URL = 'http://localhost:8080/seov/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, {
      username,
      password
    });
  }

  checkToken() {
    const token = localStorage.getItem('token');

    return this.http.post<boolean>(`${this.API_URL}/check-token`,
      {
        token: token
      }
    );
  }
  getUserInfobyToken() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);

    this.role = decoded.role || [];
    this.permissions = decoded.permissions || [];
  }


}