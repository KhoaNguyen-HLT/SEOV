import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environments/environments';
import { LoadingService } from '../../../shared/service/loading.service';
import { finalize } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { getDefaultAutoSelectFamily } from 'net';

@Injectable({
  providedIn: 'root'
})
export class MfMaterialService {

  private baseUrl = environment.apiUrl + "/mf";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getMasterData(formData: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/getMasterData`, formData)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getZCodeData(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/getZCodeData`)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  getConsumptionData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getConsumptionData`)
  }

  getProductData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProductData`)
  }







  prepareMaterialRequestData(design_number: string): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/prepareMaterialRequestData`, { params: { design_number } })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  getDataPu(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getDataPu`, payload);
  }



  createOrder(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createOrder`, payload);
  }


  getMaterial(products: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getMaterial`, products);
  }





  getMaterialRequestData(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getMaterialRequestData`, payload);
  }


  getDetailMaterialRequest(requestNo: string): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/getDetailMaterialRequest`, { params: { requestNo } })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }



  exportMaterialRequestExcel(requestNo: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportMaterialRequestExcel`, {
      params: { requestNo },
      responseType: 'blob'
    });
  }

  updateIssuedMaterial(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/updateIssuedMaterial`, payload)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  rejectRequest(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/rejectRequest`, payload)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }


  approveRequest(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/approveRequest`, payload)
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

