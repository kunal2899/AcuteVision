import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Response } from '../entities/response';
import { RegUser } from '../entities/reg-user';
import { Student } from '../entities/student';
import { Teacher } from '../entities/teacher';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.url;
  constructor(private http: HttpClient, private _route: Router) { }

  loginUser(user: User) {
    let checkStatus = new Observable();
    // let header = 
    let options = {
      headers: new HttpHeaders({
        'ACCESS-CONTROL-ALLOW-ORIGIN':'http://127.0.0.1:8000',
        'CORS_ALLOW_CREDENTIALS':'true',
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT",
      })
    }
    let formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    return this.http.post<any>(`${this.url}/api/login`, formData, options).toPromise();
  }

  // register_matadata:Response;
  registerUser(user: RegUser) {
    let userDto = new FormData();
    userDto.append("username", user.username);
    userDto.append("password", user.password1);
    userDto.append("password2", user.password2);
    userDto.append("is_student", JSON.stringify(user.isStudent));
    userDto.append("is_teacher", JSON.stringify(user.isTeacher));
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT"
      })
    }
    this.http.post<any>(`${this.url}/api/register`, userDto, options).subscribe(data => {
      let temp = new User(data.username, user.password1);
      sessionStorage.setItem("ResponseData", JSON.stringify(data))
      this.loginUser(temp).then(data => alert("USerlogedin"));
    })
    return this.http.post<any>(`${this.url}/api/register`, userDto, options).toPromise();
  }

  saveStudentProfile(student_det: Student) {
    let bool: boolean = false
    let studentDto = new FormData();
    alert("" + (student_det.department + "-" + student_det.semster + "" + student_det.section))
    studentDto.append("Name", student_det.name);
    studentDto.append("Mobile", "" + student_det.mobile);
    studentDto.append("Email", student_det.email);
    studentDto.append("Year", "" + student_det.year);
    studentDto.append("Semester", "" + student_det.semster);
    studentDto.append("Department", student_det.department);
    studentDto.append("Enrollment", student_det.enrollment);
    studentDto.append("Section", "" + (student_det.department + "-" + student_det.semster + "" + student_det.section));
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT"
      })
    }
    // this.http.post(`${this.url}/api/profile/student`, studentDto, { headers: httpheaders }).subscribe(
    //   (data) => {
    //     sessionStorage.setItem("ResponseData", JSON.stringify(data))
    //     alert("StudentSaved")
    //   }
    // )
    return this.http.post(`${this.url}/api/profile/student`, studentDto, options).toPromise();
  }

  saveTeacherProfile(teacher: Teacher) {
    let teacherDto = new FormData();
    teacherDto.append("Name", teacher.name);
    teacherDto.append("Mobile", "" + (teacher.mobile));
    teacherDto.append("Email", teacher.email);
    teacherDto.append("Id", teacher.facultyId);
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':"GET, POST, OPTIONS, DELETE, PUT"
      })
    }
    // this.http.post(`${this.url}/api/profile/teacher`, teacherDto, { headers: httpheaders }).subscribe(
    //   data => {
    //     sessionStorage.setItem("ResponseData", JSON.stringify(data))
    //   }
    // )
    return this.http.post(`${this.url}/api/profile/teacher`, teacherDto, options).toPromise();
  }

  isUserLoggedIn(): boolean {
    return (sessionStorage.getItem("USERID") != null) ? true : false;
  }

  getUserType(): string {
    if (sessionStorage.getItem("USERTYPE") == "STUDENT") {
      return "STUDENT";
    }
    else {
      if (sessionStorage.getItem("PENDING") == "FALSE") {
        return "TEACHER";
      }
      else {
        return "PENDING_TEACHER";
      }
    }
  }

  logoutUser() {
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("USERTYPE");
    sessionStorage.removeItem("PENDING");
  }

}
