import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlbum } from '../models/core/IAlbum';
import { IArtist } from '../models/core/IArtist';
import { IPlaylist } from '../models/core/IPlaylist';

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

  // TODO Strong type
  getSavedSongs(): Observable<Object> {
    return this.http.get<Object>(
      `${environment.SERVER_URL}/${environment.SAVED_SONGS_URL}`
    );
  }
}
