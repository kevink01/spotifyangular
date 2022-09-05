import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-playlist',
  templateUrl: './loading-playlist.component.html',
  styleUrls: ['./loading-playlist.component.scss'],
})
export class LoadingPlaylistComponent implements OnInit {
  private _loadingTracks: any[] = [];
  constructor() {}
  ngOnInit() {
    this.loadingTracks = [{}, {}, {}, {}, {}];
  }

  set loadingTracks(value: any[]) {
    this._loadingTracks = value;
  }
  get loadingTracks(): any[] {
    return this._loadingTracks;
  }
}
