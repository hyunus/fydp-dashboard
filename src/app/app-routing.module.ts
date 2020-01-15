import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamedataComponent } from './gamedata/gamedata.component'
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  {path: 'login', component: LoginComponentComponent},
  {path: 'gamedata', component: GamedataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
