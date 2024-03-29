import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlbumReturn } from '../models/core/http/album';
import { ArtistReturn } from '../models/core/http/artist';
import { PlaylistReturn } from '../models/core/http/playlist';
import { RecentTracksReturn } from '../models/core/http/recent';
import { TracksReturn } from '../models/core/http/tracks';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<PlaylistReturn> {
    return this.http
      .get<PlaylistReturn>(
        `${environment.SERVER_URL}/${environment.USER_PLAYLISTS_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getLibraryAlbums(): Observable<AlbumReturn> {
    return this.http
      .get<AlbumReturn>(
        `${environment.SERVER_URL}/${environment.SAVED_ALBUMS_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getFollowedArtists(): Observable<ArtistReturn> {
    return this.http
      .get<ArtistReturn>(
        `${environment.SERVER_URL}/${environment.FOLLOWED_ARTISTS_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getSavedSongs(): Observable<TracksReturn> {
    return this.http
      .get<TracksReturn>(
        `${environment.SERVER_URL}/${environment.SAVED_SONGS_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
