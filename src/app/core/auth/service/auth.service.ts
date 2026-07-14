import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environments';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string[] = [];
  permissions: string[] = [];
  userName: string = ''

  private API_URL = environment.apiUrl + "/auth";

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, {
      username,
      password
    }).pipe(
      tap((res: any) => {
        this.tokenStorage.setToken(res.token);
      })
    );
  }

  checkToken() {
    const token = this.tokenStorage.getToken();
    return this.http.post<boolean>(
      `${this.API_URL}/check-token`,
      { token }
    );
  }

  getUserInfobyToken() {
    const token = this.tokenStorage.getToken();

    if (!token) return;
    console.log(token);

    const decoded: any = jwtDecode(token);

    this.userName = decoded.userName;
    this.role = decoded.role || [];
    this.permissions = decoded.permissions || [];
  }

  resetPassword(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/resetPassword`,
      payload);
  }


  changePassword(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/changePassword`,
      payload);
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

  updateRole(id: string, updated: any) {
    return this.http.put(`${this.API_URL}/roles/${id}`, updated);
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


  UpdateRolePermission(payload: any) {
    return this.http.post(`${this.API_URL}/UpdateRolePermission`, payload);
  }


}