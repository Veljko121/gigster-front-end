import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable, tap } from 'rxjs';
import { RegisteredUser } from './model/registered-user.model';
import { RegisteredUserUpdate } from './model/registered-user-update.model';
import { AuthenticationResponse } from '../auth/model/authentication-response.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {

  basePath = environment.apiHost + 'registered-users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getLoggedInRegisteredUser(): Observable<RegisteredUser> {
    const path = this.basePath + '/profile';
    return this.http.get<RegisteredUser>(path);
  }

  getProfilePicturePathByRegisteredUserId(registeredUserId: number): string {
    const path = this.basePath + '/' + registeredUserId + '/profile-picture';
    return path;
  }

  updateProfilePicture(picture: File): Observable<any> {
    const path = this.basePath + '/profile-picture';
    const formData = new FormData();
    formData.append('file', picture);
    return this.http.patch(path, formData);
  }

  updateProfile(registeredUserUpdate: RegisteredUserUpdate): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, registeredUserUpdate)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
