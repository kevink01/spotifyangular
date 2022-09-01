import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LibraryService } from '../library/library.service';
import { LoginService } from '../login/login.service';
import { PlayerService } from '../player/player.service';
import { environment } from 'src/environments/environment';
import { CreatePlaylistComponent } from '../playlist/create/create-playlist.component';

@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  private _AUTH_LINK!: string;
  private _dialogRef!: DynamicDialogRef;

  // TODO Strong type
  private _profile: any;
  private _recent: any;
  private _playlists: any;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private libraryService: LibraryService,
    private loginService: LoginService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.AUTH_LINK = environment.AUTH_URL;
    this.subscriptions.add(
      this.loginService.profile.subscribe({
        next: (profile) => {
          console.log(profile);
          this.profile = profile;
          this.subscriptions.add(
            this.playerService.getRecentlyPlayed().subscribe({
              next: (recent: any) => {
                console.log(recent);
                this.recent = recent.items;
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
          this.subscriptions.add(
            this.libraryService.getPlaylists().subscribe({
              next: (data: any) => {
                this.playlists = data.playlists;
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  set dialog(value: DynamicDialogRef) {
    this._dialogRef = value;
  }
  get dialog(): DynamicDialogRef {
    return this._dialogRef;
  }

  set profile(value: any) {
    this._profile = value;
  }
  get profile(): any {
    return this._profile;
  }

  set recent(value: any) {
    this._recent = value;
  }
  get recent(): any {
    return this._recent;
  }

  set playlists(value: any) {
    this._playlists = value;
  }
  get playlists(): any {
    return this._playlists;
  }

  createPlaylistDialog(): void {
    this._dialogRef = this.dialogService.open(CreatePlaylistComponent, {
      width: '50vw',
      height: '90vh',
    });
  }

  navigate(url: string): void {
    this.router.navigate(['/' + url]);
  }

  ngOnDestroy(): void {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
    this.subscriptions.unsubscribe();
  }
}
