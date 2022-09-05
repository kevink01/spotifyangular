import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Following } from '../models/playlist/following';
import { Success } from '../models/core/success';
import { Album } from '../models/components/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbum(id: string): Observable<Album> {
    return this.http
      .get<Album>(`${environment.SERVER_URL}/${environment.ALBUM_URL}?id=${id}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  isFollowingAlbum(id: string): Observable<Following> {
    return this.http
      .get<Following>(
        `${environment.SERVER_URL}/${environment.FOLLOWING_ALBUM_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  toggleFollow(id: string, following: boolean): Observable<Success> {
    return this.http
      .post<Success>(
        `${environment.SERVER_URL}/${environment.FOLLOW_ALBUM_URL}`,
        {
          id,
          following,
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
