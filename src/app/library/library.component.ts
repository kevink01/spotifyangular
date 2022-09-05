import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryService } from './library.service';
import { Album } from '../models/components/album';
import { Artist } from '../models/components/artist';
import { Playlist } from '../models/components/playlist';
import { PlaylistReturn } from '../models/core/http/playlist';
import { ArtistReturn } from '../models/core/http/artist';
import { AlbumReturn } from '../models/core/http/album';

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  private _playlists: Playlist[] = [];
  private _filteredPlaylists: Playlist[] = [];

  private _playlistFilter: string = '';
  private _playlistSort: string = '';
  private _playlistOptions: Option[] = [];

  private _artists: Artist[] = [];
  private _filteredArtists: Artist[] = [];

  private _artistFilter: string = '';
  private _artistSort: string = '';
  private _artistOptions: Option[] = [];

  private _albums: Album[] = [];
  private _filteredAlbums: Album[] = [];

  private _albumFilter: string = '';
  private _albumSort: string = '';
  private _albumOptions: Option[] = [];

  private subscription = new Subscription();

  constructor(private libraryService: LibraryService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.libraryService.getPlaylists().subscribe((data: PlaylistReturn) => {
        console.log(data.playlists);
        this.playlists = data.playlists;
        this.filteredPlaylists = data.playlists;
      })
    );
    this.playlistOptions = [
      { label: 'Relevant', value: '!name' },
      { label: 'Alphabetical', value: 'name' },
    ];
    this.subscription.add(
      this.libraryService
        .getFollowedArtists()
        .subscribe((data: ArtistReturn) => {
          console.log(data.artists);
          this.artists = data.artists;
          this.filteredArtists = data.artists;
        })
    );
    this.artistOptions = [
      { label: 'Relevant', value: '!name' },
      { label: 'Alphabetical', value: 'name' },
    ];
    this.subscription.add(
      this.libraryService.getLibraryAlbums().subscribe((data: AlbumReturn) => {
        console.log(data.albums);
        this.albums = data.albums;
        this.filteredAlbums = data.albums;
      })
    );
    this.albumOptions = [
      { label: 'Relevant', value: '!' },
      { label: 'Album', value: 'name' },
      { label: 'Artist', value: 'artist' },
    ];
  }

  changeSort(type: string, event: any): void {
    let value;
    switch (type) {
      case 'playlists':
        value = event.value;
        if (value.indexOf('!') === 0) {
          this.filteredPlaylists = this.playlists;
        } else {
          this.filteredPlaylists = [...this.playlists].sort(
            (playlist1, playlist2) =>
              playlist1.name
                .toLocaleLowerCase()
                .localeCompare(playlist2.name.toLocaleLowerCase())
          );
        }
        this.playlistSort = value;
        break;
      case 'artists':
        value = event.value;
        if (value.indexOf('!') === 0) {
          this.filteredArtists = this.artists;
        } else {
          this.filteredArtists = [...this.artists].sort((artist1, artist2) =>
            artist1.name
              .toLocaleLowerCase()
              .localeCompare(artist2.name.toLocaleLowerCase())
          );
        }
        this.artistSort = value;
        break;
      case 'albums':
        value = event.value;
        console.log(this.albums);
        if (value.indexOf('!') === 0) {
          this.filteredAlbums = this.albums;
        } else if (value === 'name') {
          this.filteredAlbums = [...this.albums].sort((album1, album2) =>
            album1.name.toLocaleLowerCase().localeCompare(album2.name)
          );
        } else {
          this.filteredAlbums = [...this.albums].sort((album1, album2) =>
            album1.artists[0].name
              .toLocaleLowerCase()
              .localeCompare(album2.artists[0].name)
          );
        }
        this.albumSort = value;
        break;
      default:
        break;
    }
  }

  navigate(page: string, id: string): void {
    this.router.navigate([`/${page}/`, id]);
  }

  set playlists(value: Playlist[]) {
    this._playlists = value;
  }
  get playlists(): Playlist[] {
    return this._playlists;
  }

  set filteredPlaylists(value: Playlist[]) {
    this._filteredPlaylists = value;
  }
  get filteredPlaylists(): Playlist[] {
    return this._filteredPlaylists;
  }

  set playlistFilter(value: string) {
    this._playlistFilter = value;
  }
  get playlistFilter(): string {
    return this._playlistFilter;
  }

  set playlistSort(value: string) {
    this._playlistSort = value;
  }
  get playlistSort(): string {
    return this._playlistSort;
  }

  set playlistOptions(value: Option[]) {
    this._playlistOptions = value;
  }
  get playlistOptions(): Option[] {
    return this._playlistOptions;
  }

  set artists(value: Artist[]) {
    this._artists = value;
  }
  get artists(): Artist[] {
    return this._artists;
  }

  set filteredArtists(value: Artist[]) {
    this._filteredArtists = value;
  }
  get filteredArtists(): Artist[] {
    return this._filteredArtists;
  }

  set artistFilter(value: string) {
    this._artistFilter = value;
  }
  get artistFilter(): string {
    return this._artistFilter;
  }

  set artistSort(value: string) {
    this._artistSort = value;
  }
  get artistSort(): string {
    return this._artistSort;
  }

  set artistOptions(value: Option[]) {
    this._artistOptions = value;
  }
  get artistOptions(): Option[] {
    return this._artistOptions;
  }

  set albums(value: Album[]) {
    this._albums = value;
  }
  get albums(): Album[] {
    return this._albums;
  }

  set filteredAlbums(value: Album[]) {
    this._filteredAlbums = value;
  }
  get filteredAlbums(): Album[] {
    return this._filteredAlbums;
  }

  set albumFilter(value: string) {
    this._albumFilter = value;
  }
  get albumFilter(): string {
    return this._albumFilter;
  }

  set albumSort(value: string) {
    this._albumSort = value;
  }
  get albumSort(): string {
    return this._albumSort;
  }

  set albumOptions(value: Option[]) {
    this._albumOptions = value;
  }
  get albumOptions(): Option[] {
    return this._albumOptions;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
