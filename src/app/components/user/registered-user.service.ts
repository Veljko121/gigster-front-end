import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { RegisteredUser } from './model/registered-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {

  basePath = environment.apiHost + 'registered-users';

  constructor(
    private http: HttpClient,
  ) { }

  getLoggedInRegisteredUser(): Observable<RegisteredUser> {
    const path = this.basePath + '/profile';
    return this.http.get<RegisteredUser>(path);
  }

}
