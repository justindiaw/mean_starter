import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Unit } from '../models/unit';

@Injectable()
export class OverviewService {
  readonly apiPrefix = 'api/units';
  constructor(private http: HttpClient) { }

  getTeacherOverview(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiPrefix);
  }

  addTeacher(unit: Unit): Observable<any> {
    return this.http.post<any>(this.apiPrefix, unit);
  }

  deleteTeacher(unit: Unit): Observable<any> {
    return this.http.delete<any>(`${this.apiPrefix}/${unit._id}`);
  }

  updateTeacher(unit: Unit): Observable<any> {
    return this.http.put<any>(`${this.apiPrefix}/${unit._id}`, JSON.stringify(unit));
  }
}
