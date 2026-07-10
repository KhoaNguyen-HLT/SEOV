import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';
import { LoadingService } from '../../shared/service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SePeService {

  private baseUrl = environment.apiUrl + "/pe";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getBomData(formData: any): Observable<any> {
    console.log('Đang gửi yêu cầu với file:', formData.get('file'));
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/getBomData`, formData)
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

