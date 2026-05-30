import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environments';
import { LoadingService } from '../../shared/service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class qaService {

  private baseUrl = environment.apiUrl + "/qa/iqc";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getDataExcel(formData: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/getDataExcel`, formData)
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

  getLotData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getLotData`);
  }

  getReport(lotA: string, lotB: string, program: string): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/getReport`, null, { params: { lotA, lotB, program } })
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
  }

}

