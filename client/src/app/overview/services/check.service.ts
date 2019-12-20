import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CheckService {


  readonly apiPrefix = 'api/check';
  constructor(private http: HttpClient) { }

  checkIn(unitId: string): Observable<void> {
    return this.http.post<any>(`${this.apiPrefix}/in/${unitId}`, { checkInTime: new Date() });
  }

  checkOut(unitId: string): Observable<void> {
    return this.http.post<any>(`${this.apiPrefix}/out/${unitId}`, { checkOutTime: new Date() });
  }
}
