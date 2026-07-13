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
  private baseUrlCross = environment.apiUrl + "/pu/cfr/cross";
  private baseUrlDpm = environment.apiUrl + "/pu/dpm";

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
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/getData`, { params: payload })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  checkExistedData(month: string, reportName: string): Observable<any> {
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.get(`${this.baseUrl}/checkExistedData`, { params });
  }



  // crosscheck in/out data//


  checkExistedCrossInOutData(formData: any, month: string, reportName: string): Observable<any> {
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrlCross}/checkExistedCrossInOutData`, formData, { params });
  }


  checkExistedCrossIvtData(formData: any, month: string, reportName: string): Observable<any> {
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrlCross}/checkExistedCrossIvtData`, formData, { params });
  }


  getCrossInOutData(formData: any, month: string, reportName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrlCross}/getCrossInOutData`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getCrossIvtData(formData: any, month: string, reportName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('month', month).set('reportName', reportName);
    return this.http.post(`${this.baseUrlCross}/getCrossIvtData`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }








  // updateOpenInventory(payload: any) {
  //   return this.http.post(`${this.baseUrl}/updateOpenInventory`, { params: payload });
  // }


  updateOpenInventory(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/updateOpenInventory`, data)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  // Delivery Plan Managerment (DPM)
  getGscmData(formData: any, dataType: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('dataType', dataType);
    return this.http.post(`${this.baseUrlDpm}/getGscmData`, formData, { params })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

}

