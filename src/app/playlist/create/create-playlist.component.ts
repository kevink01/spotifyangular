import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LibraryService } from 'src/app/library/library.service';
import { PlaylistService } from 'src/app/playlist/playlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit, OnDestroy {
  steps: MenuItem[] = [];
  currentStep: number = 0;
  hasSubmittedStep: boolean[] = [false, false, false];

  playlist: any = {};
  playlistForm: any;
  songForm: any;
  maxSongError = false;
  loading = false;

  uploadURL: string = '';
  uploadedImage: any = {};

  savedSongs: any;

  subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private libraryService: LibraryService,
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {
    this.uploadURL = `${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`;
  }
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
    console.log(this.playlistForm);
    this.songForm = this.fb.group({
      songs: this.fb.array([]),
    });
    this.subscription.add(
      this.libraryService.getSavedSongs().subscribe((data: any) => {
        this.savedSongs = data.tracks;
      })
    );
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

  advance(): void {
    this.loading = true;
    switch (this.currentStep) {
      case 0:
        if (this.hasSubmittedStep[0]) {
          this.subscription.add(
            this.playlistService
              .updatePlaylist(this.playlist.id, this.playlistForm.value)
              .subscribe({
                next: () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Playlist updated!',
                    detail: `Name: ${this.playlist.name}`,
                    life: 1000,
                  });
                  // Update values
                  this.playlist.name = this.name.value;
                  this.playlist.description = this.description.value;
                  this.playlist.public = this.public.value;
                  this.playlist.collaborative = this.collaborative.value;
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
                next: (data: any) => {
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
              next: (data: any) => {
                this.playlist = data;
                this.hasSubmittedStep[0] = true;
                this.messageService.add({
                  severity: 'success',
                  summary: `Added ${this.songForm.value.length} songs!`,
                  detail: `Name: ${this.playlist.name}`,
                  life: 2000,
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Unable to add songs',
                  detail: err.error.message,
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

  addSong(uri: string) {
    let index = this.songs.controls.findIndex(
      (control) => control.value === uri
    );
    // Song was not found (adding), prevent adding
    if (this.songs.controls.length >= 3 && index === -1) {
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
