import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getHistoryChecks(unitId: string): Observable<any> {
    return this.http.get<any>(`api/history-check/${unitId}/2019`);
  }
}
