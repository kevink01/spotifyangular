import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from '../models/Profile/Playlist';
import { PlaylistService } from './playlist.service';
import { Track } from '../models/Profile/Track';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlaylistEditComponent } from './edit/playlist-edit.component';
import { faCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [DialogService],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  id: string = '';
  playlist!: Playlist;
  tracks!: Track[];
  length: string = '';
  subscription = new Subscription();
  loading = true;
  edit = false;
  private dialogRef!: DynamicDialogRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService,
    private dialogService: DialogService
  ) {
    faCode.iconName.toString();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.playlistService.getPlaylist(this.id).subscribe((playlist) => {
        console.log(playlist);
        this.loading = false;
        this.playlist = playlist;
        this.tracks = playlist.tracks;
        this.length = this.calculateDuration(playlist.tracks);
      })
    );
  }

  private calculateDuration(tracks: Track[]): string {
    let time = 0;
    tracks.forEach((track) => {
      time += track.duration;
    });
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    return `${hours}:${minutes}`;
  }

  show(): void {
    this.dialogRef = this.dialogService.open(PlaylistEditComponent, {
      header: `Edit ${this.playlist.name}`,
      width: '50vw',
      height: '75vh',
      data: this.playlist,
    });
    this.subscription.add(
      this.dialogRef.onClose.subscribe(() => console.log('Done'))
    );
  }

  getDialog(): DynamicDialogRef {
    return this.dialogRef;
  }
  getTracks(): Track[] {
    return this.playlist.tracks;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
