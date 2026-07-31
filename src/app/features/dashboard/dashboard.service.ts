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

  

  

}

