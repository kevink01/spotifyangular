import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlaylist } from '../models/core/IPlaylist';
import { IArtist } from '../models/core/IArtist';
import { IAlbum } from '../models/core/IAlbum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<IPlaylist[]> {
    return this.http.get<IPlaylist[]>(
      `${environment.SERVER_URL}/${environment.USER_PLAYLISTS_URL}`
    );
  }

  getLibraryAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(
      `${environment.SERVER_URL}/${environment.SAVED_ALBUMS_URL}`
    );
  }

  getFollowedArtists(): Observable<IArtist[]> {
    return this.http.get<IArtist[]>(
      `${environment.SERVER_URL}/${environment.FOLLOWED_ARTISTS_URL}`
    );
  }

  getSavedSongs(): Observable<Object> {
    return this.http.get<Object>(
      `${environment.SERVER_URL}/${environment.SAVED_SONGS_URL}`
    );
  }
}
