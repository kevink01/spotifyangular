import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../models/components/playlist';
import { Track } from '../models/shared/track';
import { Success } from '../models/core/success';
import { Details } from '../models/playlist/details';
import { Snapshot } from '../models/core/snapshot';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService implements OnDestroy {
  private _playlistSubject = new BehaviorSubject<Playlist | null>(null);
  private _playlists = this._playlistSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPlaylist(id: string): Observable<Playlist> {
    return this.http
      .get<Playlist>(
        `${environment.SERVER_URL}/${environment.PLAYLIST_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  createPlaylist(values: Details): Observable<Playlist> {
    return this.http
      .post<Playlist>(
        `${environment.SERVER_URL}/${environment.CREATE_PLAYLIST_URL}`,
        values
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  uploadImage(id: string, image: any): Observable<Success> {
    return this.http
      .post<Success>(
        `${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`,
        {
          id: id,
          image: image,
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylistDetails(id: string, details: Details): Observable<Success> {
    return this.http.put<Success>(
      `${environment.SERVER_URL}/${environment.UPDATE_PLAYLIST_URL}`,
      {
        id: id,
        details: details,
      }
    );
  }

  addToPlaylist(
    id: string,
    tracks: string[],
    position: number
  ): Observable<Snapshot> {
    return this.http
      .post<Snapshot>(
        `${environment.SERVER_URL}/${environment.ADD_TO_PLAYLIST_URL}`,
        {
          id,
          tracks,
          position,
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylistTracks(
    id: string,
    snapshot: string,
    values: Track[]
  ): Observable<Snapshot> {
    return this.http
      .put<Snapshot>(
        `${environment.SERVER_URL}/${environment.REORDER_PLAYLIST_URL}`,
        {
          id: id,
          snapshot: snapshot,
          tracks: values.map((track) => {
            return track.uri;
          }),
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  deletePlaylist(id: string): Observable<Success> {
    return this.http
      .delete<Success>(
        `${environment.SERVER_URL}/${environment.DELETE_PLAYLIST_URL}`,
        {
          body: { id },
        }
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylists(value: Playlist) {
    this._playlistSubject.next(value);
  }

  get playlists(): Observable<Playlist | null> {
    return this._playlists;
  }
  ngOnDestroy(): void {
    this._playlistSubject.unsubscribe();
  }
}
