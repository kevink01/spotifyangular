import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlaylistService } from 'src/app/playlist/playlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit {
  private _dialogRef!: DynamicDialogRef;

  steps: MenuItem[] = [];
  currentStep: number = 0;
  hasSubmittedStep: boolean[] = [false, false, false];

  playlist: any = {};
  playlistForm: any;
  loading = false;

  uploadURL: string = '';
  uploadedImage: any = {};

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private messageService: MessageService
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
      scope: false,
      collaborative: false,
    });
  }

  reload(event: any): void {
    if (event.message.severity === 'success' && this.currentStep < 2) {
      this.currentStep++;
      this.hasSubmittedStep[0] = true;
    }
    this.loading = false;
  }

  advance(): void {
    this.loading = true;
    switch (this.currentStep) {
      case 0:
        if (this.hasSubmittedStep[0]) {
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
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Unable to update playlist',
                  detail: err.message,
                  life: 2000,
                });
              },
            });
        } else {
          // Has not created playlist
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
            });
        }
        break;
      case 1:
        this.uploadImage(this.uploadedImage);
        break;
      case 2:
        break;
      default:
        break;
    }
  }

  uploadImage(file: any): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
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
        });
    };
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  get name() {
    return this.playlistForm.get('name');
  }

  get description() {
    return this.playlistForm.get('description');
  }

  get scope() {
    return this.playlistForm.get('scope');
  }
}
