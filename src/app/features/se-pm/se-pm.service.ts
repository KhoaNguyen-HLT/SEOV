import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';
import { LoadingService } from '../../shared/service/loading.service';
import { HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PmService {

  private shippingUrl = environment.apiUrl + "/pm/shipping";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }


  getShippingPlanData(payload: any): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.shippingUrl}/getShippingPlanData`, { params: payload })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  generateShippingPlan(): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.shippingUrl}/calculateMaterialRequirement`)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
    ;
  }




  getShippingData(formData: any, month: string, userName: string, fileName: string): Observable<any> {
    this.loadingService.show();
    const params = new HttpParams().set('month', month).set('userName', userName).set('fileName', fileName);
    return this.http.post(`${this.shippingUrl}/getShippingData`, formData, { params })
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

