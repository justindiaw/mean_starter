import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  readonly apiPrefix = 'api/user';

  constructor(private http: HttpClient) { }

  login(): Observable<void> {
    return this.http.post<void>(`${this.apiPrefix}/login`, {
      email: 'user@manage.com',
      password: '123'
    });
  }
}
