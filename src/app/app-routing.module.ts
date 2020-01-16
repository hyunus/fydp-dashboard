import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponentComponent } from './login-component/login-component.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponentComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
