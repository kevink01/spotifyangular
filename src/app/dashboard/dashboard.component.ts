import { Component, OnInit } from '@angular/core';
import { Playlist } from '../models/components/playlist';

@Component({
  selector: 'spotify-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private _playlists: Playlist[] = [];
  constructor() {}

  ngOnInit(): void {}

  set playlist(value: Playlist[]) {
    this._playlists = value;
  }
  get playlist(): Playlist[] {
    return this._playlists;
  }
}
