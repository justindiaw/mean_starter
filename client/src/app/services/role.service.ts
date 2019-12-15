import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '../model/role';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  getTeacherOverview(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:3000/api/role');
  }
}
