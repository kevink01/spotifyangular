import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { CreatePlaylistComponent } from './playlist/create-playlist.component';
@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  private _AUTH_LINK!: string;
  private _dialogRef!: DynamicDialogRef;
  constructor(private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.AUTH_LINK = environment.AUTH_URL;
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  getDialog(): DynamicDialogRef {
    return this._dialogRef;
  }

  navigate(url: string): void {
    this.router.navigate(['/' + url]);
  }

  createPlaylist(): void {
    this._dialogRef = this.dialogService.open(CreatePlaylistComponent, {
      width: '50vw',
      height: '75vh',
    });
    this._dialogRef.onClose.subscribe(() => console.log('Done with create'));
  }

  ngOnDestroy(): void {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}
