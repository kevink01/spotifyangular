import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  constructor(private http: HttpClient) {}

  getRecentlyPlayed(): Observable<Object> {
    return this.http.get(
      `${environment.SERVER_URL}/${environment.RECENTLY_PLAYED_URL}`
    );
  }
}
