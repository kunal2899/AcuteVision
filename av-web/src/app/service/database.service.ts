import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Student } from '../entities/student';
import { environment } from 'src/environments/environment';
import { Teacher } from '../entities/teacher';
import { User } from '../entities/user';
import { Response } from '../entities/response';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public http:HttpClient) { }
  url=environment.url
  getStudent(username:string){
    let options = {
      headers: new HttpHeaders({
        // 'ACCESS-CONTROL-ALLOW-ORIGIN':'http://127.0.0.1:8000',
        // 'CORS_ALLOW_CREDENTIALS':'true',
        // "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        // 'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT",
      })
    }
    // alert(username)
    return this.http.get<any>(`${this.url}/api/profile/student/${username}`,options).toPromise();
    
  }
  getTeacher(username:string){
    let options = {
      headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin':'http://127.0.0.1:8000',
        // 'CORS_ALLOW_CREDENTIALS':'true',
        // "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        // 'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT",
      })
    }
    return this.http.get<any>(`${this.url}/api/profile/teacher/${username}`,options).toPromise();
  }

  verifyPassword(user:User){
    let cred=new FormData();
    cred.append("username",user.username);
    cred.append("password",user.password);
    return this.http.post<Response>(`${this.url}/api/login`,cred).toPromise();
  }

  
  updateStudent(student){
    let studDto=new FormData();
    studDto.append("Name",student.name);
    studDto.append("Mobile",""+student.mobile);
    studDto.append("Email",student.email);
    studDto.append("Year",""+student.year);
    studDto.append("Semester",""+student.semster);
    studDto.append("Department",student.department);
    studDto.append("Enrollment",student.enrollment);
    studDto.append("Section",student.section);
    // alert(student.section);
   return this.http.put<string>(`${this.url}/api/profile/student`,studDto).toPromise();
  }

  updateTeacher(teacher){
    let teacherDto=new FormData();
    teacherDto.append("Name",teacher.name);
    teacherDto.append("Mobile",teacher.mobile);
    teacherDto.append("Email",teacher.email);
    teacherDto.append("Id",teacher.facultyId);
    return this.http.put<string>(`${this.url}/api/profile/teacher`,teacherDto).toPromise();
  }
}
