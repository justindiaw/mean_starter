import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getHistoryChecks(unitId: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/ms-excel');
    return this.http.get<any>(`api/history-check/${unitId}/2019`, { responseType: 'blob' as 'json', headers: headers });
  }
}
