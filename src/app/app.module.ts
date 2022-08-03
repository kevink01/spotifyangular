import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './shared/primeng.module';
import { StyleClassModule } from 'primeng/styleclass';

import { CreatePlaylistComponent } from './sidenav/playlist/create-playlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './login/home/home.component';
import { LibraryComponent } from './library/library.component';
import { LoginRedirectComponent } from './login/redirect/login-redirect.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEditComponent } from './playlist/edit/playlist-edit.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TestComponent } from './test/test.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InformationComponent } from './sidenav/playlist/information/information.component';
import { SongsComponent } from './sidenav/playlist/songs/songs.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePlaylistComponent,
    DashboardComponent,
    HomeComponent,
    LibraryComponent,
    LoginRedirectComponent,
    PlaylistComponent,
    PlaylistEditComponent,
    SidenavComponent,
    ToolbarComponent,
    TestComponent,
    InformationComponent,
    SongsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
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
