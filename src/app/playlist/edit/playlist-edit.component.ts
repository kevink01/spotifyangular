import { Component, OnInit } from '@angular/core';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Track } from 'src/app/models/Profile/Track';
import { PlaylistComponent } from '../playlist.component';

@Component({
  selector: 'spotify-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.scss'],
})
export class PlaylistEditComponent implements OnInit {
  private dialogRef!: DynamicDialogRef;
  private _tracks: Track[] = [];
  constructor(
    private playlistComponent: PlaylistComponent,
    private dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.dialogRef = this.playlistComponent.getDialog();
    this.tracks = <Track[]>this.dialogConfig.data;
  }
  set tracks(value: Track[]) {
    this._tracks = value;
  }
  get tracks(): Track[] {
    return this._tracks;
  }
}
