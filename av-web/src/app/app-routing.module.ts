import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: '/dashboard/home' },
  { path: 'log-reg' , component: LogRegComponent },
  { path: 'dashboard', component: DashboardComponent ,
    children : [
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
