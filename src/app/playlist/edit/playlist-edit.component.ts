import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/Profile/Playlist';
import { Track } from 'src/app/models/Profile/Track';
import { environment } from 'src/environments/environment';
import { PlaylistComponent } from '../playlist.component';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'spotify-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.scss'],
})
export class PlaylistEditComponent implements OnInit, OnDestroy {
  selected: number = 0;
  form: any;
  test: any;

  uploadURL: string = '';
  uploadedImage: any = {};
  displayImage: any;

  private dialogRef!: DynamicDialogRef;
  private _tracks: Track[] = [];
  private _playlist!: Playlist;
  private subscription = new Subscription();
  constructor(
    private playlistComponent: PlaylistComponent,
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private playlistService: PlaylistService
  ) {
    this.uploadURL = `${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`;
  }

  ngOnInit(): void {
    this.dialogRef = this.playlistComponent.getDialog();
    this.playlist = <Playlist>Object.assign({}, this.dialogConfig.data);
    this.tracks = <Track[]>[...this.dialogConfig.data.tracks];
    this.form = this.fb.group({
      name: [
        this.dialogConfig.data.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        this.dialogConfig.data.description,
        Validators.maxLength(300),
      ],
      public: this.dialogConfig.data.public,
      scope: this.dialogConfig.data.collaborative,
    });
    this.displayImage = this.dialogConfig.data.images[0].url;
  }

  changeSelected(event: any): void {
    this.selected = event.index;
  }
  save(): void {
    console.log(this.form.value);
    switch (this.selected) {
      case 0:
        this.subscription.add(
          this.playlistService
            .updatePlaylist(this.playlist.id, this.form.value)
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Playlist updated!',
                  detail: `Name: ${this.form.value.name}`,
                  life: 1000,
                });
                // TODO bind playlist to changes
                // this.playlist.name = this.form.value.name;
                // this.playlist.description = this.form.value.description;
                // this.playlist.public = this.form.value.public;
                // this.playlist.collaborative = this.scope.collaborative;
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Unable to update playlist',
                  detail: err.message,
                  life: 2000,
                });
              },
            })
        );
        break;
      case 1:
        this.subscription.add(
          this.playlistService
            .updatePlaylistTracks(this.playlist.id, this.tracks)
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Tracks updated!',
                  detail: `Name: ${this.playlist.name}`,
                  life: 2000,
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed to update!',
                  detail: err.message,
                  life: 2000,
                });
              },
            })
        );
        break;
      default:
        break;
    }
    console.log(this.tracks);
    console.log(this.tracks.map((track: Track) => track.uri));
  }

  uploadImage(file: any): void {
    console.log(this.playlist);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      this.subscription.add(
        this.playlistService
          .uploadImage(
            this.playlist.id,
            (fileReader.result as string).slice(
              (fileReader.result as string).indexOf('base64,') + 7
            )
          )
          .subscribe({
            next: () => {
              // DO NOT SET ObjectURL to anything else or it'll break web security
              this.displayImage = file.objectURL;
              this.messageService.add({
                severity: 'success',
                summary: 'Uploaded image!',
                detail: `Playlist name: ${this.playlist.name}`,
                life: 1000,
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Unable to create playlist',
                detail: err.message,
                life: 2000,
              });
            },
          })
      );
    };
  }

  set tracks(value: Track[]) {
    this._tracks = value;
  }
  get tracks(): Track[] {
    return this._tracks;
  }
  set playlist(value: Playlist) {
    this._playlist = value;
  }
  get playlist(): Playlist {
    return this._playlist;
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get public() {
    return this.form.get('public');
  }
  get scope() {
    return this.form.get('scope');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
