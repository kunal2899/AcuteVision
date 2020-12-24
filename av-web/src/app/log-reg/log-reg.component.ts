import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../entities/user';
import { RegUser } from '../entities/reg-user';
import { Teacher } from '../entities/teacher';
import { Router } from '@angular/router';
import { Student } from '../entities/student';
import { DatabaseService } from '../service/database.service';
import { Response } from '../entities/response';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Semester {
  semesterCode: string;
  semesterValue: number;
}
// const spinnerSrc="../../assets/spinner.gif";
const semesters: Semester[] = [
  { "semesterCode": "I", "semesterValue": 1 },
  { "semesterCode": "II", "semesterValue": 2 },
  { "semesterCode": "III", "semesterValue": 3 },
  { "semesterCode": "IV", "semesterValue": 4 },
  { "semesterCode": "V", "semesterValue": 5 },
  { "semesterCode": "VI", "semesterValue": 6 },
  { "semesterCode": "VII", "semesterValue": 7 },
  { "semesterCode": "VIII", "semesterValue": 8 },
]
@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  public availableSemester: Semester[];
  public valueType: boolean
  public isTeacher: boolean = false;
  public showSpinner: boolean = false;
  constructor(public authService: AuthenticationService, public dataService: DatabaseService, public _router: Router,public snackBar:MatSnackBar) {
    this.valueType = true;
    matched: Boolean;
  }

  ngOnInit(): void {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    var matched = false;

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
      this.loginForm.reset();
      document.getElementById("user_form").style.display = "flex";
      document.getElementById("student_form").style.display = "none";
      document.getElementById("teacher_form").style.display = "none";
      this.valueType = true;
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      this.signupForm1.get("username_enrollment").reset();
      this.signupForm1.get("password").reset();
      this.signupForm1.get("confirm_pass").reset();
      this.signupStudentForm.reset();
      this.signupTeacherForm.reset();
      document.getElementById("user_form").style.display = "flex"
      document.getElementById("student_form").style.display = "none"
      document.getElementById("teacher_form").style.display = "none"
      this.valueType = true;
    });

  }


  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })



  signupForm1 = new FormGroup({
    userType: new FormControl("Student", [Validators.required]),
    username_enrollment: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    confirm_pass: new FormControl(null, [Validators.required])
  })

  signupStudentForm = new FormGroup({
    fullname: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+[' ']{0,1}[a-zA-Z]+[' ']{0,1}[a-zA-Z]+")]),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    enrollment: new FormControl(null),
    department: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    semester: new FormControl(null, [Validators.required]),
    section: new FormControl(null, [Validators.required])
  })

  signupTeacherForm = new FormGroup({
    fullname: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+[' ']{0,1}[a-zA-Z]+[' ']{0,1}[a-zA-Z]+")]),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    facultyId: new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  loginUser() {
    if (this.loginForm.valid) {
      this.showSpinner = true
      this.authService.logoutUser();
      let user = new User(this.loginForm.get("username").value, this.loginForm.get("password").value);
      this.authService.loginUser(user).then(
        data => {
          sessionStorage.setItem("USERID", data.username);
          if (data.is_student) {
            sessionStorage.setItem("USERTYPE", "STUDENT");
          }
          else if (data.is_teacher) {
            sessionStorage.setItem("USERTYPE", "TEACHER");
          }
          if (data.is_pending) {
            sessionStorage.setItem("PENDING", "TRUE");
          }
          else {
            sessionStorage.setItem("PENDING", "FALSE");
          }
          if (!data.Registered) {
            setTimeout(() => {
              this.loginForm.reset();
              const container = document.querySelector(".container");
              container.classList.remove("sign-in-mode");
              container.classList.add("sign-up-mode");
              this.showSpinner = false;
            }, 2000);
            if (data.is_student) {
              document.getElementById("user_form").style.display = "none";
              document.getElementById("student_form").style.display = "flex";
              this.signupStudentForm.get("enrollment").patchValue(data.username);
              document.getElementById("teacher_form").style.display = "none";
            }
            else {
              document.getElementById("user_form").style.display = "none";
              document.getElementById("student_form").style.display = "none";
              this.signupTeacherForm.get("facultyId").patchValue(data.username);
              document.getElementById("teacher_form").style.display = "flex";
            }
          } else {
            if (data.is_student) {
              this.dataService.getStudent(data.username).then(student => {
                sessionStorage.setItem("NAME", student.Name)
                this._router.navigate(['dashboard/home']);
              })
            } else {
              this.dataService.getTeacher(data.username).then(teacher => {
                sessionStorage.setItem("NAME", teacher.Name);
                this._router.navigate(['dashboard/home']);
              });
            }
            // sessionStorage.getItem("NAME");
          }
        }
      ).catch(err => {
        console.log(err.message);
        this.showSpinner = false;
      });
    } else {
      this.showSpinner = false;
      this.loginForm.markAllAsTouched()
    }
  }

  changePlaceholderandValidators(event) {
    this.signupForm1.controls["username_enrollment"].patchValue(null);
    this.signupForm1.controls["password"].patchValue(null);
    this.signupForm1.controls["confirm_pass"].patchValue(null);
    this.signupForm1.controls["username_enrollment"].markAsUntouched();
    this.signupForm1.controls["password"].markAsUntouched();
    this.signupForm1.controls["confirm_pass"].markAsUntouched();

    if (event.target.value == "teacher") {
      this.isTeacher = true;
      this.signupForm1.get('username_enrollment').setValidators([Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z0-9]{3,}")])
    }
    else {
      this.signupForm1.controls[""]
      this.isTeacher = false;
      this.signupForm1.get('username_enrollment').setValidators([Validators.required, Validators.minLength(3), Validators.pattern("[0-9]{4}[A-Z]{2}[0-9]{6}")])
    }
    this.signupForm1.get("username_enrollment").updateValueAndValidity();
  }

  getAvailableSemester(event) {
    let yearValue = parseInt(event.target.value);
    this.availableSemester = semesters.slice((yearValue - 1) * 2, (yearValue - 1) * 2 + 1);
  }

  signUpUser() {
    this.showSpinner = true;
    let isTeacher: boolean = this.signupForm1.get("userType").value == "teacher" ? true : false
    // alert(isTeacher);
    let user = new RegUser(this.signupForm1.get("username_enrollment").value, this.signupForm1.get("password").value, this.signupForm1.get("confirm_pass").value, isTeacher, !isTeacher)
    if (this.signupForm1.valid) {
      this.authService.registerUser(user).then(data => {
        sessionStorage.setItem("USERID",data.username);
        if (data.is_student) {
          sessionStorage.setItem("USERTYPE", "STUDENT");
        }
        else if (data.is_teacher) {
          sessionStorage.setItem("USERTYPE", "TEACHER");
        }
        if (data.is_pending) {
          sessionStorage.setItem("PENDING", "TRUE");
        }
        else {
          sessionStorage.setItem("PENDING", "FALSE");
        }
        this.showSpinner = false;
        document.getElementById("user_form").style.display = "none";
        if (data.is_teacher) {
          document.getElementById("teacher_form").style.display = "flex";
          this.signupTeacherForm.get("facultyId").patchValue(data.username);
        } else {
          document.getElementById("student_form").style.display = "flex";
          this.signupStudentForm.get("enrollment").patchValue(data.username);
        }
      })
    }
    else {
      this.showSpinner = false;
      this.signupForm1.markAllAsTouched();
    }
  }

  saveTeacherProfile() {
    this.showSpinner = true;
    this.signupTeacherForm.controls["facultyId"].setValidators(null);
    this.signupTeacherForm.controls["facultyId"].updateValueAndValidity();
    let teacher = new Teacher(this.signupTeacherForm.get("fullname").value, this.signupTeacherForm.get("mobile").value, this.signupTeacherForm.get("email").value, this.signupTeacherForm.get("facultyId").value);
    if (this.signupTeacherForm.valid) {
      this.authService.saveTeacherProfile(teacher).then((data: Response) => {
        this.dataService.getTeacher(data.username).then(teacher => {
          sessionStorage.setItem("NAME", teacher.Name);
          setTimeout(()=>{this.snackBar.open("Redirecting To Dashboard", "", {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ['.mat-snack-bar-container']
          })
          },2000);
          this._router.navigate(["/dashboard/home"]);
        });
      }).catch(err => {
        alert(err.error);
        this.showSpinner = false;
      });
    }
    else {
      this.signupTeacherForm.markAllAsTouched();
    }
  }

  saveStudentProfile() {
    this.showSpinner = true;
    this.signupStudentForm.controls["enrollment"].setValidators(null);
    this.signupStudentForm.controls["enrollment"].updateValueAndValidity();
    if (this.signupStudentForm.valid) {
      let student = new Student(this.signupStudentForm.get("fullname").value, this.signupStudentForm.get("mobile").value, this.signupStudentForm.get("email").value, this.signupStudentForm.get("enrollment").value, this.signupStudentForm.get("year").value, this.signupStudentForm.get("semester").value, this.signupStudentForm.get("section").value, this.signupStudentForm.get("department").value);
      this.authService.saveStudentProfile(student).then((data: Response) => {
        this.showSpinner = false;
        this.dataService.getStudent(data.username).then(student => {
          sessionStorage.setItem("NAME", student.Name);
          this._router.navigate(["/dashboard/home"]);
        });

      }).catch(err => alert(err.error));
    }
    else {
      this.signupStudentForm.markAllAsTouched();
      alert("error");
    }
  }
}
