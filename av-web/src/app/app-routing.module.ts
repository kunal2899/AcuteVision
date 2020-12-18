import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { RouteguardGuard } from './service/routeguard.guard';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: '/log-reg' },
  { path: 'log-reg' , component: LogRegComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[RouteguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
