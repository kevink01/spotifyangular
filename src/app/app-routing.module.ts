import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './login/home/home.component';
import { LoginRedirectComponent } from './login/redirect/login-redirect.component';
import { PlayerNewComponent } from './player-new/player-new.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './profile/user/user.component';
import { AuthGuard } from './utility/auth.guard';

const routes: Routes = [
  // TODO Comment out the canActivate: [AuthGuard] when ready
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent /*canActivate: [AuthGuard]*/ },
  { path: 'album/:id', component: AlbumComponent /*canActivate: [AuthGuard]*/ },
  { path: 'artist/:id', component: ArtistComponent /*canActivate: [AuthGuard]*/ },
  {
    path: 'playlist/:id',
    component: PlaylistComponent,
    /*canActivate: [AuthGuard],*/
  },
  { path: 'profile', component: ProfileComponent /*canActivate: [AuthGuard]*/ },
  {
    path: 'profile/:id',
    component: UserComponent /*canActivate: [AuthGuard]*/,
  },
  // Guard does not exist on dashboard. The Redirect component will do the authentication
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginRedirectComponent,
  },
  {
    path: 'test',
    component: PlayerNewComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
