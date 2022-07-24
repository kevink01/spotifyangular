import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlaylist } from '../models/core/IPlaylist';
import { IArtist } from '../models/core/IArtist';
import { IAlbum } from '../models/core/IAlbum';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<IPlaylist[]> {
    return this.http.get<IPlaylist[]>(`${Constants.SERVER_URL}/playlists`);
  }

  getLibraryAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(`${Constants.SERVER_URL}/saved/albums`);
  }

  getFollowedArtists(): Observable<IArtist[]> {
    return this.http.get<IArtist[]>(`${Constants.SERVER_URL}/artists`);
  }
}
