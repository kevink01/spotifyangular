import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AlbumService } from './album.service';
import { Color } from '../utility/index';
import { Following } from '../models/Album/following';
import { Track } from '../models/Profile/Track';

@Component({
  selector: 'spotify-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  // TODO Strong type
  private _album: any;
  private _id: string = '';
  private _duration: string = '';

  subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.albumService.getAlbum(this.id).subscribe({
        next: (data: any) => {
          this.album = data;
          data.tracks.forEach((track: Track) => {
            this.subscription.add(
              this.albumService.trackPopularity(track.id).subscribe({
                next: (data: any) => {
                  track.popularity = data.popularity;
                },
              })
            );
          });
          this.subscription.add(
            this.albumService.isFollowingAlbum(data.id).subscribe({
              next: (data: Following) => {
                this.album.following = data.following;
              },
            })
          );
          this.duration = this.calculateDuration(this.album.tracks);
        },
      })
    );
  }

  toggleFollow(): void {
    this.subscription.add(
      this.albumService
        .toggleFollow(this.album.id, this.album.following)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: `${
                this.album.following ? 'Unfollowed' : 'Followed'
              } album!`,
              detail: `Name: ${this.album.name}`,
              life: 2000,
            });
            this.album.following = !this.album.following;
          },
        })
    );
  }

  getPopularityColor(pop: number): string {
    return Color.hexColor(pop);
  }

  private calculateDuration(tracks: Object[]): string {
    let time = 0;
    tracks.forEach((track: any) => {
      time += track.duration;
    });
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    if (hours === 0) {
      return `${minutes} minutes`;
    } else {
      return `${hours}hr ${minutes} min`;
    }
  }

  set album(value: any) {
    this._album = value;
  }
  get album(): any {
    return this._album;
  }

  set id(value: string) {
    this._id = value;
  }
  get id(): string {
    return this._id;
  }

  set duration(value: string) {
    this._duration = value;
  }
  get duration(): string {
    return this._duration;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
