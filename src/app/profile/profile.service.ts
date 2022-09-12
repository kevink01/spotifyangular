import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentUser } from '../models/core/user';
import { Following } from '../models/core/following';
import { Profile } from '../models/core/profile';
import { PlaylistReturn } from '../models/core/http/playlist';
import { Success } from '../models/core/success';

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

  isFollowingUser(id: string): Observable<Following> {
    return this.http
      .get<Following>(
        `${environment.SERVER_URL}/${environment.FOLLOWING_USER_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  followUser(id: string): Observable<Success> {
    return this.http
      .post<Success>(
        `${environment.SERVER_URL}/${environment.FOLLOW_USER_URL}`,
        {
          id: id,
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  unfollowUser(id: string): Observable<Success> {
    return this.http
      .delete<Success>(
        `${environment.SERVER_URL}/${environment.UNFOLLOW_USER_URL}`,
        {
          body: { id },
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
