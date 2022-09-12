import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibraryService } from '../library/library.service';
import { ProfileService } from './profile.service';
import { CurrentUser } from '../models/core/user';
import { Playlist } from '../models/components/playlist';
import { PlaylistReturn } from '../models/core/http/playlist';
import { Router } from '@angular/router';

@Component({
  selector: 'spotify-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _id: string = '';
  private _profile!: CurrentUser;
  private _publicPlaylists: number = 0;

  private _playlists!: Playlist[];

  private subscriptions = new Subscription();

  constructor(
    private profileService: ProfileService,
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.profileService.getMe().subscribe({
        next: (data: CurrentUser) => {
          this.profile = data;
        },
      })
    );
    this.subscriptions.add(
      this.libraryService.getPlaylists().subscribe({
        next: (data: PlaylistReturn) => {
          this.playlists = data.playlists;
          data.playlists.forEach((playlist: Playlist) => {
            if (playlist.public) this.publicPlaylists++;
          });
        },
      })
    );
  }

  navigate(component: string, params: string) {
    this.router.navigate([`/${component}/${params}`]);
  }

  set id(value: string) {
    this._id = value;
  }
  get id() {
    return this._id;
  }

  set profile(value: CurrentUser) {
    this._profile = value;
  }
  get profile(): CurrentUser {
    return this._profile;
  }

  set publicPlaylists(value: number) {
    this._publicPlaylists = value;
  }
  get publicPlaylists(): number {
    return this._publicPlaylists;
  }

  set playlists(value: Playlist[]) {
    this._playlists = value;
  }
  get playlists(): Playlist[] {
    return this._playlists;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
