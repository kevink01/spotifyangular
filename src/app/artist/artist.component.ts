import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistService } from './artist.service';
import { Artist } from '../models/components/artist';

@Component({
  selector: 'spotify-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  private _id: string = '';
  private _artist!: Artist;
  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.artistService.getArtist(this.id).subscribe({
        next: (data: Artist) => {
          this.artist = data;
        },
      })
    );
  }

  set id(value: string) {
    this._id = value;
  }
  get id(): string {
    return this._id;
  }

  set artist(value: Artist) {
    this._artist = value;
  }
  get artist(): Artist {
    return this._artist;
  }
}
