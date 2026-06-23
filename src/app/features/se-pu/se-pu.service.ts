import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';
import { LoadingService } from '../../shared/service/loading.service';
import { finalize } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { getDefaultAutoSelectFamily } from 'net';

@Injectable({
  providedIn: 'root'
})
export class SePuService {

  private baseUrl = environment.apiUrl + "/pu/cfr";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getMasterData(formData: any, reportName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('reportName', reportName);
    return this.http.post(`${this.baseUrl}/getMasterData`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  

  getTransData(formData: any, month: string, reportName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrl}/getTransData`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getTransData15a(formData: any, month: string, reportName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrl}/getTransData15a`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  
  

  getData(payload: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getData`, { params: payload });
  }


  // updateOpenInventory(payload: any) {
  //   return this.http.post(`${this.baseUrl}/updateOpenInventory`, { params: payload });
  // }


  updateOpenInventory( data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/updateOpenInventory`, data)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  // getReport(lotA: string, lotB: string, program: string, msTypeRp: string): Observable<any> {
  //   this.loadingService.show();
  //   return this.http.post(`${this.baseUrl}/getReport`, null, { params: { lotA, lotB, program, msTypeRp } })
  //     .pipe(
  //       finalize(() => {
  //         this.loadingService.hide();
  //       })
  //     );
  // }

}

