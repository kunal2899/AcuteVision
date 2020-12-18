import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Student } from '../entities/student';
import { environment } from 'src/environments/environment';
import { Teacher } from '../entities/teacher';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public http:HttpClient) { }
  url=environment.url
  getStudent(username:string){
    let options = {
      headers: new HttpHeaders({
        'ACCESS-CONTROL-ALLOW-ORIGIN':'http://127.0.0.1:8000',
        'CORS_ALLOW_CREDENTIALS':'true',
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT",
      })
    }
    alert(username)
    return this.http.get<any>(`${this.url}/api/profile/student/${username}`,options).toPromise();
    
  }
  getTeacher(username:string){
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'http://127.0.0.1:8000',
        'CORS_ALLOW_CREDENTIALS':'true',
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT",
      })
    }
    return this.http.get<any>(`${this.url}/api/profile/teacher/${username}`,options).toPromise();
  }
}
