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

  getZCodeData(zCode: string): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/getZCodeData`, { params: { zCode } })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  
  getData(payload: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getData`, { params: payload });
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

