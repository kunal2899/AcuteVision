import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Response } from '../entities/response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url=environment.url;
  constructor( private http:HttpClient) { }
  loginUser(user:User){
    let basicHeaderString="Basic "+ window.btoa(user.username+":"+user.password);
    let header=new HttpHeaders({
      Authorization:basicHeaderString
    })
    this.http.post<Response>(`${this.url}/api/login`,{header}).subscribe(
      (data:Response)=>{
        sessionStorage.setItem("USERID",data.username);
        sessionStorage.setItem("TOCKEN", basicHeaderString);
        if(data.is_student){
          sessionStorage.setItem("USERTYPE","STUDENT");
        }
        else if(data.is_teacher){
          sessionStorage.setItem("USERTYPE","TEACHER");
        }
        
        if(data.is_pending){
          sessionStorage.setItem("PENDING","TRUE");
        }
        else{
          sessionStorage.setItem("PENDING","FALSE");
        }
      }
    )
  }

  isUserLoggedIn():boolean{
    return (sessionStorage.getItem("USERNAME")!=null)? true:false; 
  }

  getUserType():string{
    if(sessionStorage.getItem("USERTYPE")=="STUDENT"){
      return "STUDENT";
    }
    else{
      if(sessionStorage.getItem("PENDING")=="FALSE"){
        return "TEACHER";
      }
      else{
        return "PENDING_TEACHER";
      }
    }
  }

  logoutUser(){
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("USERTYPE");
    sessionStorage.removeItem("PENDING");
  }
  
}
