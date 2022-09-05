import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LibraryService } from '../library/library.service';
import { LoginService } from '../login/login.service';
import { PlayerService } from '../player/player.service';
import { environment } from 'src/environments/environment';
import { CreatePlaylistComponent } from '../playlist/create/create-playlist.component';
import { RecentTracksReturn } from '../models/core/http/recent';
import { Track } from '../models/shared/track';
import { Profile } from '../models/core/profile';
import { Playlist } from '../models/components/playlist';
import { PlaylistReturn } from '../models/core/http/playlist';

@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  private _AUTH_LINK!: string;
  private _dialogRef!: DynamicDialogRef;

  private _profile!: Profile;
  private _recent: Track[] = [];
  private _playlists: Playlist[] = [];

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
    this.subscriptions.add;
    // TODO Only get information when successful login
    this.loginService.profile().subscribe({
      next: (data: Profile) => {
        console.log(data);
        this.profile = data;
        this.subscriptions.add(
          this.playerService.getRecentlyPlayed().subscribe({
            next: (data: RecentTracksReturn) => {
              this.recent = data.tracks;
            },
          })
        );
        this.subscriptions.add(
          this.libraryService.getPlaylists().subscribe({
            next: (data: PlaylistReturn) => {
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
    });
    this.loginService.profile().subscribe({
      next: (data: Profile) => {
        console.log(data);
      },
    });
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

  set profile(value: Profile) {
    this._profile = value;
  }
  get profile(): Profile {
    return this._profile;
  }

  set recent(value: Track[]) {
    this._recent = value;
  }
  get recent(): Track[] {
    return this._recent;
  }

  set playlists(value: Playlist[]) {
    this._playlists = value;
  }
  get playlists(): Playlist[] {
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
