import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LibraryService } from 'src/app/library/library.service';
import { Playlist } from '../../models/components/playlist';
import { PlaylistService } from 'src/app/playlist/playlist.service';
import { environment } from 'src/environments/environment';
import { Track } from '../../models/components/track';
import { TracksReturn } from '../../models/core/http/tracks';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit, OnDestroy {
  private _steps: MenuItem[] = [];
  private _currentStep: number = 1;
  private _hasSubmittedStep: boolean[] = [false, false, false];

  private _playlist!: Playlist;
  private _savedSongs: Track[] = [];

  private _playlistForm!: FormGroup;
  private _songForm!: FormGroup;
  private _loading = false;
  private _maxSongError = false;

  private _uploadURL: string = '';
  // TODO: Strong type image
  private _uploadedImage: Object = {};

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private messageService: MessageService,
    private playlistService: PlaylistService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.steps = [
      { label: 'Information' },
      { label: 'Image' },
      { label: 'Songs' },
    ];
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(300)],
      public: [false],
      collaborative: [false],
    });
    this.songForm = this.fb.group({
      songs: this.fb.array([]),
    });
    this.subscription.add(
      this.libraryService.getSavedSongs().subscribe({
        next: (data: TracksReturn) => {
          this.savedSongs = data.tracks;
        },
      })
    );
    this.uploadURL = `${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`;
  }

  advance(): void {
    this.loading = true;
    switch (this.currentStep) {
      case 0:
        if (this.hasSubmittedStep[0]) {
          this.subscription.add(
            this.playlistService
              .updatePlaylistDetails(this.playlist.id, this.playlistForm.value)
              .subscribe({
                next: () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Playlist updated!',
                    detail: `Name: ${this.playlist.name}`,
                    life: 1000,
                  });
                  // Update values
                  this.playlist.name = this.name?.value;
                  this.playlist.description = this.description?.value;
                  this.playlist.public = this.public?.value;
                  this.playlist.collaborative = this.collaborative?.value;
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
        } else {
          // Has not created playlist
          this.subscription.add(
            this.playlistService
              .createPlaylist(this.playlistForm.value)
              .subscribe({
                next: (data: Playlist) => {
                  this.playlist = data;
                  this.hasSubmittedStep[0] = true;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Playlist created!',
                    detail: `Name: ${data.name}`,
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
        }
        break;
      case 1:
        this.uploadImage(this.uploadedImage);
        break;
      case 2:
        this.subscription.add(
          this.playlistService
            .addToPlaylist(
              this.playlist.id,
              this.songs.controls.map((control) => {
                return control.value;
              }),
              0
            )
            .subscribe({
              next: () => {
                this.hasSubmittedStep[0] = true;
                this.messageService.add({
                  severity: 'success',
                  summary: `Added ${this.songs.controls.length} songs!`,
                  detail: `Name: ${this.playlist.name}`,
                  life: 2000,
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Unable to add songs',
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
  }

  uploadImage(file: any): void {
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

  addSong(uri: string) {
    let index = this.songs.controls.findIndex(
      (control) => control.value === uri
    );
    // Limit to 100 songs
    if (this.songs.controls.length >= 100 && index === -1) {
      this.maxSongError = true;
      return;
    }
    if (index !== -1) {
      if (this.songs.controls.length === 3) {
        this.maxSongError = false;
      }
      this.songs.removeAt(index);
    } else {
      this.songs.controls.push(this.fb.control(uri));
    }
  }

  reload(event: any): void {
    if (event.message.severity === 'success') {
      this.hasSubmittedStep[this.currentStep] = true;
      if (this.currentStep < 2) {
        this.currentStep++;
      }
    }
    this.loading = false;
    // Currently done, we will close the dialog
    if (this.currentStep === 2 && this.hasSubmittedStep[2]) {
      this.ref.close();
    }
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  checkSong(uri: string) {
    if (this.songs.controls.find((control) => control.value === uri)) {
      return true;
    }
    return false;
  }

  set steps(value: MenuItem[]) {
    this._steps = value;
  }
  get steps(): MenuItem[] {
    return this._steps;
  }

  set currentStep(value: number) {
    this._currentStep = value;
  }
  get currentStep(): number {
    return this._currentStep;
  }

  set hasSubmittedStep(value: boolean[]) {
    this._hasSubmittedStep = value;
  }
  get hasSubmittedStep(): boolean[] {
    return this._hasSubmittedStep;
  }

  set playlist(value: Playlist) {
    this._playlist = value;
  }
  get playlist(): Playlist {
    return this._playlist;
  }

  set savedSongs(value: Track[]) {
    this._savedSongs = value;
  }
  get savedSongs(): Track[] {
    return this._savedSongs;
  }

  set playlistForm(value: FormGroup) {
    this._playlistForm = value;
  }
  get playlistForm(): FormGroup {
    return this._playlistForm;
  }

  set songForm(value: FormGroup) {
    this._songForm = value;
  }
  get songForm(): FormGroup {
    return this._songForm;
  }

  set loading(value: boolean) {
    this._loading = value;
  }
  get loading(): boolean {
    return this._loading;
  }

  set maxSongError(value: boolean) {
    this._maxSongError = value;
  }
  get maxSongError(): boolean {
    return this._maxSongError;
  }

  set uploadURL(value: string) {
    this._uploadURL = value;
  }
  get uploadURL(): string {
    return this._uploadURL;
  }

  set uploadedImage(value: any) {
    this._uploadedImage = value;
  }
  get uploadedImage(): any {
    return this._uploadedImage;
  }

  get name() {
    return this.playlistForm.get('name');
  }

  get description() {
    return this.playlistForm.get('description');
  }

  get public() {
    return this.playlistForm.get('public');
  }

  get collaborative() {
    return this.playlistForm.get('collaborative');
  }

  get songs() {
    return this.songForm.get('songs') as FormArray;
  }

  ngOnDestroy(): void {
    this.messageService.clear();
    this.subscription.unsubscribe();
  }
}
