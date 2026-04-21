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



  // Role----------------------------------------
  getAllRoles() {
    return this.http.get(`${this.API_URL}/roles`);
  }

  getRoleById(id: string) {
    return this.http.get(`${this.API_URL}/roles/${id}`);
  }

  createRole(role: any) {
    return this.http.post(`${this.API_URL}/roles`, role);
  }

  updateRole(id: string, role: any) {
    return this.http.put(`${this.API_URL}/roles/${id}`, role);
  }

  deleteRole(id: string) {
    return this.http.delete(`${this.API_URL}/roles/${id}`);
  }

  // Permission
  GetAllPermissions() {
    return this.http.get(`${this.API_URL}/permissions`);
  }

  GetPermissionById(id: string) {
    return this.http.get(`${this.API_URL}/permissions/${id}`);
  }

  CreatePermission(permission: any) {
    return this.http.post(`${this.API_URL}/permissions`, permission);
  }

  UpdatePermission(id: string, permission: any) {
    return this.http.put(`${this.API_URL}/permissions/${id}`, permission);
  }

  DeletePermission(id: string) {
    return this.http.delete(`${this.API_URL}/permissions/${id}`);
  }

}