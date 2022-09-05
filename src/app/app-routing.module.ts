import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './login/home/home.component';
import { LoginRedirectComponent } from './login/redirect/login-redirect.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './profile/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginRedirectComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
