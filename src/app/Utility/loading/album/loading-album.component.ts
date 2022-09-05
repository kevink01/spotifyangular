import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-album',
  templateUrl: './loading-album.component.html',
  styleUrls: ['./loading-album.component.scss'],
})
export class LoadingAlbumComponent implements OnInit {
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
