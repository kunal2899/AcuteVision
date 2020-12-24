import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-dashboard',                            
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  user_name: string;
  isTeacher:boolean;
  attendance = 75;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService:AuthenticationService, public dataService:DatabaseService, public _router:Router) {
    
  }

  ngOnInit(): void {
    this.user_name=sessionStorage.getItem("NAME");
    if(this.authService.getUserType()=="STUDENT"){
      this.isTeacher=false;
    }
    else{
      this.isTeacher=true;
    }

    // $(document).ready(function () {
    //   $('mat-nav-list a').on('click',function(){
    //     $(this).addClass('menu-active').siblings().removeClass('menu-active');
    //     $('.sel a').each(function(){
    //       $(this).removeClass('link-active').siblings().removeClass('link-active');
    //     });
    //   });

    //   $('.sel a').on('click',function(){
    //       $(this).addClass('link-active').siblings().removeClass('link-active');
    //       $('mat-nav-list a').each(function(){
    //         $(this).removeClass('menu-active').siblings().removeClass('menu-active');
    //       });
    //   });
    //   var path = window.location.href;
    //   $('mat-nav-list a').each(function(){
    //     if(this.href === path){
    //       $(this).addClass('menu-active').siblings().removeClass('menu-active');
    //     }
    //   });
  }

  logout(){
    this.authService.logoutUser();
  }

}
