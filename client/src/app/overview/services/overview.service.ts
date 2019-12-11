import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TeacherOverview } from '../models/teacher-overview';

@Injectable()
export class OverviewService {

  constructor(private http: HttpClient) { }

  getTeacherOverview(): Observable<TeacherOverview[]> {
    return this.http.get<TeacherOverview[]>('http://localhost:3000/api/teachers');
  }

  addTeacher(teacher: TeacherOverview): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/teachers', teacher);
  }
}
