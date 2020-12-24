import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeauthGuard implements CanDeactivate<DashboardComponent> {
  constructor(private auth: AuthenticationService) { }
  // canDeactivate():boolean{
  // let bool=confirm("Are you sure to logout ?")
  // if(bool){
  //  return true;
  // }
  // else
  //  return false;
  canDeactivate(component: DashboardComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (confirm("Are you sure to logout?")) {
      this.auth.logoutUser();
      return true;
    }
    else {
      return false;
    }
  }

}

