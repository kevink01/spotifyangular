import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecentTracksReturn } from '../models/core/http/recent';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getRecentlyPlayed(): Observable<RecentTracksReturn> {
    return this.http.get<RecentTracksReturn>(
      `${environment.SERVER_URL}/${environment.RECENTLY_PLAYED_URL}`
    );
  }
}
