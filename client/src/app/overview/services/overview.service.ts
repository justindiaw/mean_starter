import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TeacherOverview } from '../models/teacher-overview';

@Injectable()
export class OverviewService {

  constructor(private http: HttpClient) { }

  getTeacherOverview(): Observable<TeacherOverview[]> {
    return this.http.get<TeacherOverview[]>('http://localhost:3000/test');
  }

  getTest(): Observable<any> {
    return this.http.get('http://localhost:3000/test');
  }
}
