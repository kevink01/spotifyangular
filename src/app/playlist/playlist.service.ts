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
    return this.http
      .get<Playlist>(
        `${environment.SERVER_URL}/${environment.PLAYLIST_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  createPlaylist(values: Object) {
    return this.http
      .post(
        `${environment.SERVER_URL}/${environment.CREATE_PLAYLIST_URL}`,
        values
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylist(id: string, values: Object) {
    return this.http
      .put(`${environment.SERVER_URL}/${environment.UPDATE_PLAYLIST_URL}`, {
        id: id,
        details: values,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  uploadImage(id: string, image: any): Observable<any> {
    return this.http
      .post(`${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`, {
        id: id,
        image: image,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  addToPlaylist(id: string, tracks: string[], position: number) {
    return this.http
      .post(`${environment.SERVER_URL}/${environment.ADD_TO_PLAYLIST_URL}`, {
        id,
        tracks,
        position,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylists(value: Object) {
    this._playlistSubject.next(value);
  }

  deletePlaylist(id: string) {
    return this.http
      .delete(`${environment.SERVER_URL}/${environment.DELETE_PLAYLIST_URL}`, {
        body: { id },
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  get playlists(): Observable<Object> {
    return this._playlists;
  }
  ngOnDestroy(): void {
    this._playlistSubject.unsubscribe();
  }
}
