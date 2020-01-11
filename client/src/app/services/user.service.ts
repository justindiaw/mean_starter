import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/user';

@Injectable()
export class UserService {
  readonly apiPrefix = 'api/user';

  constructor(private http: HttpClient) { }

  login(): Observable<User> {
    return this.http.post<User>(`${this.apiPrefix}/login`, {
      email: 'user@manage.com',
      password: '123'
    });
  }
}
