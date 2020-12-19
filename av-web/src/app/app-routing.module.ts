import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { ProfileComponent } from './profile/profile.component';
import { DeauthGuard } from './service/deauth.guard';
import { RouteguardGuard } from './service/routeguard.guard';

const routes: Routes = [
  // { path: '', path}
  { path: '' , pathMatch: 'full' , redirectTo: '/log-reg'},
  { path: 'log-reg' , component: LogRegComponent },
  { path: 'dashboard', component: DashboardComponent,
     children : [
      { path: 'profile', component: ProfileComponent},
      { path: 'home', component: HomeComponent}
    ], canActivate:[ RouteguardGuard ], canDeactivate:[DeauthGuard] 
  },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
