import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-album',
  templateUrl: './loading-album.component.html',
  styleUrls: ['./loading-album.component.scss'],
})
export class LoadingAlbumComponent implements OnInit {
  loadingTracks: any[] = [];
  constructor() {}
  ngOnInit() {
    this.loadingTracks = [{}, {}, {}, {}, {}];
  }
}
