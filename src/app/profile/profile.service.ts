import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/core/user';
import { Profile } from '../models/core/profile';
import { PlaylistReturn } from '../models/core/http/playlist';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<CurrentUser> {
    return this.http
      .get<CurrentUser>(`${environment.SERVER_URL}/${environment.USER_ME_URL}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getProfile(id: string): Observable<Profile> {
    return this.http
      .get<Profile>(
        `${environment.SERVER_URL}/${environment.PROFILE_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getProfilePlaylists(id: string): Observable<PlaylistReturn> {
    return this.http
      .get<PlaylistReturn>(
        `${environment.SERVER_URL}/${environment.PROFILE_PLAYLISTS_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
