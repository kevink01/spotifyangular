import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryService } from '../library/library.service';
import { ProfileService } from './profile.service';
import { Playlist } from '../models/components/playlist';
import { PlaylistReturn } from '../models/core/http/playlist';
import { Profile } from '../models/core/profile';

@Component({
  selector: 'spotify-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _id: string = '';
  private _profile!: Profile;
  private _publicPlaylists: number = 0;

  private _playlists!: Playlist[];

  private subscriptions = new Subscription();

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
      })
    );
    this.subscriptions.add(
      this.profileService.getProfile(this.id).subscribe({
        next: (data: Profile) => {
          this.profile = data;
        },
      })
    );
    this.subscriptions.add(
      this.libraryService.getPlaylists().subscribe({
        next: (data: PlaylistReturn) => {
          this.playlists = data.playlists;
        },
      })
    );
  }

  set id(value: string) {
    this._id = value;
  }
  get id() {
    return this._id;
  }

  set profile(value: Profile) {
    this._profile = value;
  }
  get profile(): Profile {
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
