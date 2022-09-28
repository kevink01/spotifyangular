import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { StyleClassModule } from 'primeng/styleclass';

import { AlbumComponent } from './album/album.component';
import { CreatePlaylistComponent } from './playlist/create/create-playlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './login/home/home.component';
import { LibraryComponent } from './library/library.component';
import { LoadingAlbumComponent } from './utility/loading/album/loading-album.component';
import { LoadingPlaylistComponent } from './utility/loading/playlist/loading-playlist.component';
import { LoadingProfileComponent } from './utility/loading/profile/loading-profile.component';
import { LoginRedirectComponent } from './login/redirect/login-redirect.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEditComponent } from './playlist/edit/playlist-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserComponent } from './profile/user/user.component';
import { PlayerComponent } from './player/player.component';
import { ArtistComponent } from './artist/artist.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    CreatePlaylistComponent,
    DashboardComponent,
    HomeComponent,
    LibraryComponent,
    LoadingAlbumComponent,
    LoadingPlaylistComponent,
    LoadingProfileComponent,
    LoginRedirectComponent,
    PlaylistComponent,
    PlaylistEditComponent,
    ProfileComponent,
    SidenavComponent,
    ToolbarComponent,
    UserComponent,
    PlayerComponent,
    ArtistComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    ReactiveFormsModule,
    StyleClassModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
