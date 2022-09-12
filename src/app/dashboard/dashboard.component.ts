import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Playlist } from '../models/components/playlist';

@Component({
  selector: 'spotify-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private _playlists: Playlist[] = [];
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
    } else {
      this.router.navigate(['/']);
    }
  }

  set playlist(value: Playlist[]) {
    this._playlists = value;
  }
  get playlist(): Playlist[] {
    return this._playlists;
  }
}
