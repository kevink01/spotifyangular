import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbum } from '../models/core/IAlbum';
import { IArtist } from '../models/core/IArtist';
import { IPlaylist } from '../models/core/IPlaylist';
import { Constants } from '../shared/constants';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
}
