import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '../model/role';

@Injectable()
export class RoleService {
  readonly apiPrefix = 'api/roles';
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiPrefix);
  }
}
