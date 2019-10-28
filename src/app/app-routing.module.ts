import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamedataComponent } from './gamedata/gamedata.component'

const routes: Routes = [
  {path: 'gamedata', component: GamedataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
