import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Unit } from '../models/unit';

@Injectable()
export class OverviewService {

  constructor(private http: HttpClient) { }

  getTeacherOverview(): Observable<Unit[]> {
    return this.http.get<Unit[]>('http://localhost:3000/api/units');
  }

  addTeacher(unit: Unit): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/units', unit);
  }

  deleteTeacher(unit: Unit): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/units/${unit._id}`);
  }

  updateTeacher(unit: Unit): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/units/${unit._id}`, JSON.stringify(unit));
  }
}
