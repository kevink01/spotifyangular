import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/Profile/Playlist';
import { Track } from 'src/app/models/Profile/Track';
import { PlaylistComponent } from '../playlist.component';

@Component({
  selector: 'spotify-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.scss'],
})
export class PlaylistEditComponent implements OnInit, OnDestroy {
  selected: number = 0;
  form: any;
  private dialogRef!: DynamicDialogRef;
  private _tracks: Track[] = [];
  private _playlist!: Playlist;
  private subscription = new Subscription();
  constructor(
    private playlistComponent: PlaylistComponent,
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.dialogRef = this.playlistComponent.getDialog();
    this.playlist = <Playlist>Object.assign({}, this.dialogConfig.data);
    this.tracks = <Track[]>[...this.dialogConfig.data.tracks];
    this.form = this.fb.group({
      name: [this.dialogConfig.data.name, Validators.required],
      description: [
        this.dialogConfig.data.description,
        Validators.maxLength(300),
      ],
      public: this.dialogConfig.data.public,
      scope: this.dialogConfig.data.collaborative,
    });
  }

  changeSelected(event: any): void {
    this.selected = event.index;
  }
  save(): void {
    console.log(this.form.value);
    switch (this.selected) {
      // TODO Update playlist
      case 0:
        this.messageService.add({
          severity: 'success',
          summary: 'Playlist details updated!',
          detail: `Name: ${this.playlist.name}`,
          life: 1000,
        });
        break;
      case 1:
        this.messageService.add({
          severity: 'success',
          summary: 'Tracks updated!',
          detail: `Name: ${this.playlist.name}`,
          life: 1000,
        });
        break;
      default:
        break;
    }
    console.log(this.tracks);
    console.log(this.tracks.map((track: Track) => track.uri));
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
