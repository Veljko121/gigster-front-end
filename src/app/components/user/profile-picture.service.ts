import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  profilePicturesPath = environment.imagesPath + 'profile-pictures/';

  constructor(
    private http: HttpClient
  ) { }

  getProfilePicturePath(profilePictureName: string): string {
    const path = this.profilePicturesPath + profilePictureName;
    return path;
  }

}
