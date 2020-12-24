import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckAttendanceTComponent } from './check-attendance-t/check-attendance-t.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { ModifyAttendanceComponent } from './modify-attendance/modify-attendance.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RouteguardGuard } from './service/routeguard.guard';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: '/dashboard/home' },
  { path: 'log-reg' , component: LogRegComponent },
  { path: 'dashboard', component: DashboardComponent, 
  // canActivate:[RouteguardGuard] ,
     children : [
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: 'capture', component: TakeAttendanceComponent },
      { path: 'modify', component: ModifyAttendanceComponent },
      { path: 'check', component: CheckAttendanceTComponent }
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
