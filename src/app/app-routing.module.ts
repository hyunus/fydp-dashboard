import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponentComponent } from './login-component/login-component.component';
import { PatientsComponent } from './patients/patients.component'
import { AuthGuard } from './_helpers/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component'
import { AddProgramComponent } from './add-program/add-program.component'
import { GamedataComponent } from './gamedata/gamedata.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponentComponent},
  {path: 'patients', component: PatientsComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'games', component: GamesComponent, canActivate:[AuthGuard]},
  {path: 'addprogram', component: AddProgramComponent, canActivate:[AuthGuard]},
  {path: 'gamedata', component: GamedataComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
