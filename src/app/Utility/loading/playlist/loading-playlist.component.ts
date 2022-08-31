import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-playlist',
  templateUrl: './loading-playlist.component.html',
  styleUrls: ['./loading-playlist.component.scss'],
})
export class LoadingPlaylistComponent implements OnInit {
  loadingTracks: any[] = [];
  constructor() {}
  ngOnInit() {
    this.loadingTracks = [{}, {}, {}, {}, {}];
  }
}
