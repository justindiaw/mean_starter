import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockTeachers } from 'src/app/mocks/mock-teachers';

import { TeacherOverview } from '../models/teacher-overview';

@Injectable()
export class OverviewService {

  constructor() { }

  getTeacherOverview(): Observable<TeacherOverview[]> {
    return of(MockTeachers);
  }
}
