import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from '../models/Profile/Playlist';
import { PlaylistService } from './playlist.service';
import { Track } from '../models/Profile/Track';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlaylistEditComponent } from './edit/playlist-edit.component';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
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

  redirect(event: any) {
    if (event.message.severity === 'success') {
      this.router.navigate(['/dashboard']);
    }
  }

  show(): void {
    this.dialogRef = this.dialogService.open(PlaylistEditComponent, {
      header: `Edit ${this.playlist.name}`,
      width: '70vw',
      height: '90vh',
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
