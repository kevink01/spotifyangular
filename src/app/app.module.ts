import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { PrimengModule } from './shared/primeng.module';
import { StyleClassModule } from 'primeng/styleclass';

import { CreatePlaylistComponent } from './sidenav/playlist/create-playlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './login/home/home.component';
import { LibraryComponent } from './library/library.component';
import { LoadingPlaylistComponent } from './shared/loading/playlist/loading-playlist.component';
import { LoginRedirectComponent } from './login/redirect/login-redirect.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEditComponent } from './playlist/edit/playlist-edit.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TestComponent } from './test/test.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import {
  faAnglesLeft,
  faAnglesRight,
  faArrowRightToBracket,
  faBan,
  faBars,
  faBookBookmark,
  faCircleNotch,
  faCirclePlay,
  faCompactDisc,
  faFloppyDisk,
  faFolderPlus,
  faHeadphones,
  faHeartCircleCheck,
  faHouseChimneyUser,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faMinus,
  faPenToSquare,
  faPlus,
  faStar,
  faStopwatch,
  faTrash,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    CreatePlaylistComponent,
    DashboardComponent,
    HomeComponent,
    LibraryComponent,
    LoadingPlaylistComponent,
    LoginRedirectComponent,
    PlaylistComponent,
    PlaylistEditComponent,
    SidenavComponent,
    ToolbarComponent,
    TestComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    ReactiveFormsModule,
    StyleClassModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faAnglesLeft,
      faAnglesRight,
      faArrowRightToBracket,
      faBan,
      faBars,
      faBookBookmark,
      faCircleNotch,
      faCirclePlay,
      faCompactDisc,
      faFloppyDisk,
      faFolderPlus,
      faHeadphones,
      faHeartCircleCheck,
      faHouseChimneyUser,
      faLock,
      faLockOpen,
      faMagnifyingGlass,
      faMinus,
      faPenToSquare,
      faPlus,
      faStar,
      faStopwatch,
      faTrash,
      faUser,
      faUsers
    );
  }
}
