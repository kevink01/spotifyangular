import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../profile.service';
import { Playlist } from '../../models/components/playlist';
import { PlaylistReturn } from 'src/app/models/core/http/playlist';
import { Profile } from '../../models/core/profile';
import { Following } from '../../models/core/following';
import { Success } from 'src/app/models/core/success';

@Component({
  selector: 'spotify-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private _id: string = '';
  private _profile!: Profile;
  private _publicPlaylists: number = 0;
  private _isFollowing: boolean = false;

  private _playlists!: Playlist[];

  private subscriptions = new Subscription();

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
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
          this.subscriptions.add(
            this.profileService
              .getProfilePlaylists(data.id)
              .subscribe((data: PlaylistReturn) => {
                this.playlists = data.playlists;
                data.playlists.forEach((playlist: Playlist) => {
                  if (playlist.public) this.publicPlaylists++;
                });
              })
          );
          this.subscriptions.add(
            this.profileService
              .isFollowingUser(data.id)
              .subscribe((data: Following) => {
                this.isFollowing = data.following;
              })
          );
        },
      })
    );
  }

  toggleFollow(): void {
    switch (this.isFollowing) {
      case true:
        this.subscriptions.add(
          this.profileService.unfollowUser(this.profile.id).subscribe({
            next: (data: Success) => {
              if (data.success) {
                this.isFollowing = !this.isFollowing;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Unfollowed user! 😪',
                  detail: this.profile.name,
                  life: 2000,
                });
              } else {
                this.messageService.add({
                  severity: 'warning',
                  summary: 'Something went wrong...',
                  detail: this.profile.name,
                  life: 2000,
                });
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Unable to follow user',
                detail: err.message,
                life: 2000,
              });
            },
          })
        );
        break;
      case false:
        this.subscriptions.add(
          this.profileService.followUser(this.profile.id).subscribe({
            next: (data: Success) => {
              if (data.success) {
                this.isFollowing = !this.isFollowing;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Followed user! 😊',
                  detail: this.profile.name,
                  life: 2000,
                });
              } else {
                this.messageService.add({
                  severity: 'warning',
                  summary: 'Something went wrong...',
                  detail: this.profile.name,
                  life: 2000,
                });
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Unable to unfollow user',
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

  navigate(component: string, params: string) {
    this.router.navigate([`/${component}/${params}`]);
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

  set isFollowing(value: boolean) {
    this._isFollowing = value;
  }
  get isFollowing(): boolean {
    return this._isFollowing;
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
