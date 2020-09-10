import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogRegComponent } from './log-reg/log-reg.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo: '/log-reg' },
  { path: 'log-reg' , component: LogRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
