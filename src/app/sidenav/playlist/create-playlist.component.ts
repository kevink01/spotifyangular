import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlaylistService } from 'src/app/playlist/playlist.service';
import { SidenavComponent } from '../sidenav.component';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit {
  private _dialogRef!: DynamicDialogRef;
  steps: MenuItem[] = [];
  currentStep: number = 0;
  playlist: any;
  loading = false;
  success = true;
  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {}
  ngOnInit(): void {
    this.steps = [
      { label: 'Information' },
      { label: 'Image' },
      { label: 'Songs' },
    ];
    this.playlist = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(300)],
      scope: false,
      collaborative: false,
    });
  }

  advance(): void {
    this.loading = true;
    console.log(this.playlist.value);
    this.playlistService.createPlaylist(this.playlist.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Done');
      },
    });
    if (this.currentStep < 1) {
      this.currentStep++;
    }
    this.loading = false;
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  get name() {
    return this.playlist.get('name');
  }

  get description() {
    return this.playlist.get('description');
  }

  get scope() {
    return this.playlist.get('scope');
  }
}
