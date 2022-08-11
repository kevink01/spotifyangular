import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../models/Profile/Playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService implements OnDestroy {
  private _playlistSubject = new BehaviorSubject<Object>('');
  private _playlists = this._playlistSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(
      `${environment.SERVER_URL}/${environment.PLAYLIST_URL}?id=${id}`
    ).pipe(catchError((err) => throwError(() => err.error)));
  }

  createPlaylist(values: any) {
    return this.http
      .post(
        `${environment.SERVER_URL}/${environment.CREATE_PLAYLIST_URL}`,
        values
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylist(id: string, values: any) {
    return this.http.put(
      `${environment.SERVER_URL}/${environment.UPDATE_PLAYLIST_URL}`,
      { id: id, details: values }
    ).pipe(catchError((err) => throwError(() => err.error)));
  }

  uploadImage(id: string, image: any): Observable<any> {
    return this.http
      .post(`${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`, {
        id: id,
        image: image,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  get playlists(): Observable<Object> {
    return this._playlists;
  }

  updatePlaylists(value: Object) {
    this._playlistSubject.next(value);
  }

  ngOnDestroy(): void {
    this._playlistSubject.unsubscribe();
  }
}
