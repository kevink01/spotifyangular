import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlaylistService } from './playlist.service';
import { PlaylistEditComponent } from './edit/playlist-edit.component';
import { Playlist } from '../models/components/playlist';
import { Track } from '../models/shared/track';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [DialogService],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private _id: string = '';
  private _playlist!: Playlist;
  private _tracks!: Track[];
  private _duration: string = '';

  private dialogRef!: DynamicDialogRef;
  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.playlistService.getPlaylist(this.id).subscribe((playlist) => {
        console.log(playlist);
        this.playlist = playlist;
        this.tracks = playlist.tracks;
        this.duration = this.calculateDuration(playlist.tracks);
      })
    );
  }

  confirmDelete(event: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this playlist?',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.subscription.add(
          this.playlistService.deletePlaylist(this.playlist.id).subscribe({
            next: () => {
              this.messageService.add({
                key: 'delete',
                severity: 'success',
                summary: 'Successfully deleted this playlist',
                detail: 'Sad to see this playlist go 😪',
                life: 2000,
              });
            },
            error: (err) => {
              this.messageService.add({
                key: 'delete',
                severity: 'error',
                summary: 'Unable to delete this playlist',
                detail: err.message,
                life: 2000,
              });
            },
          })
        );
      },
    });
  }

  showDialog(): void {
    this.dialogRef = this.dialogService.open(PlaylistEditComponent, {
      header: `Edit ${this.playlist.name}`,
      width: '70vw',
      height: '90vh',
      data: this.playlist,
    });
    this.subscription.add(
      this.subscription.add(
        this.dialogRef.onClose.subscribe(() => console.log('Done'))
      )
    );
  }

  redirect(event: any) {
    if (event.message.severity === 'success') {
      this.router.navigate(['/dashboard']);
    }
  }

  private calculateDuration(tracks: Track[]): string {
    let time = 0;
    tracks.forEach((track) => {
      time += track.duration;
    });
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    if (hours === 0) {
      return `${minutes} minutes`;
    } else {
      return `${hours}hr ${minutes} min`;
    }
  }

  set id(value: string) {
    this._id = value;
  }
  get id(): string {
    return this._id;
  }

  set playlist(value: Playlist) {
    this._playlist = value;
  }
  get playlist(): Playlist {
    return this._playlist;
  }

  set tracks(value: Track[]) {
    this._tracks = value;
  }
  get tracks(): Track[] {
    return this._tracks;
  }

  set duration(value: string) {
    this._duration = value;
  }
  get duration(): string {
    return this._duration;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
