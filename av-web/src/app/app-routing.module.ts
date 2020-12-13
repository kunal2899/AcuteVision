import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogRegComponent } from './log-reg/log-reg.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: '/dashboard' },
  { path: 'log-reg' , component: LogRegComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
