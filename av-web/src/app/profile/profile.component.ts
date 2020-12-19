import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../entities/student';
import { Teacher } from '../entities/teacher';
import { User } from '../entities/user';
import { AuthenticationService } from '../service/authentication.service';
import { DatabaseService } from '../service/database.service';
import {MatSnackBar} from '@angular/material/snack-bar'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changesDone: boolean = true;
  teacher: any;
  isTeacher: boolean;
  student: any;
  showSpinner: boolean = false;
  constructor(public authService: AuthenticationService, public dataService: DatabaseService, public snackBar:MatSnackBar) { }

  studentProfile = new FormGroup({
    fullname: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+[' ']{0,1}[a-zA-Z]+[' ']{0,1}[a-zA-Z]+")]),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    enrollment: new FormControl(null),
    department: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    semester: new FormControl(null, [Validators.required]),
    section: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  teacherProfile = new FormGroup({
    fullname: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+[' ']{0,1}[a-zA-Z]+[' ']{0,1}[a-zA-Z]+")]),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    facultyId: new FormControl({value:"",disabled:true}, [Validators.required, Validators.minLength(5)]),
    password: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
    if (sessionStorage.getItem("USERTYPE") == "TEACHER") {
      this.isTeacher = true;
      this.dataService.getTeacher(sessionStorage.getItem("USERID")).then(data => {this.teacher = data
        this.teacherProfile.get("fullname").patchValue(data.Name),
        this.teacherProfile.get("mobile").patchValue(data.Mobile),
        this.teacherProfile.get("email").patchValue(data.Email),
        this.teacherProfile.get("facultyId").patchValue(data.Id)
      });
    }
    else {
      this.isTeacher = false;
      this.dataService.getStudent(sessionStorage.getItem("USERID")).then(data => {
        this.student = data
        this.studentProfile.get("fullname").patchValue(data.Name);
        this.studentProfile.get("mobile").patchValue(data.Mobile);
        this.studentProfile.get("email").patchValue(data.Email);
        this.studentProfile.get("year").patchValue(data.Year);
        this.studentProfile.get("semester").patchValue(data.Semester);
        this.studentProfile.get("department").patchValue(data.Department);
        this.studentProfile.get("enrollment").patchValue(data.Enrollment);
        this.studentProfile.get("section").patchValue(data.Section);
      });
    }
  }

  updateStudent() {
    if (!(this.studentProfile.get("password").hasError("required")|| (
    (this.studentProfile.get("email").hasError("required")||this.studentProfile.get('email').hasError("email"))||
    (this.studentProfile.get("mobile").hasError("required")||this.studentProfile.get('mobile').hasError("pattern"))||
    (this.studentProfile.get("fullname").hasError("required")||this.studentProfile.get('fullname').hasError("pattern"))
    )) ){
      this.showSpinner = true;
      let upStudent = new Student(this.studentProfile.get("fullname").value,
        this.studentProfile.get("mobile").value,
        this.studentProfile.get("email").value,
        this.studentProfile.get("enrollment").value,
        this.studentProfile.get("year").value,
        this.studentProfile.get("semester").value,
        this.studentProfile.get("section").value,
        this.studentProfile.get("department").value
      );
      let user = new User(this.studentProfile.get('enrollment').value, this.studentProfile.get('password').value);
      this.dataService.verifyPassword(user).then(
        data => {
          this.dataService.updateStudent(upStudent).then(data => {
            this.showSpinner = false;
            this.studentProfile.get("password").patchValue("");
            this.studentProfile.get("password").markAsUntouched();
            this.studentProfile.get("password").updateValueAndValidity();
            // alert("Student Details Updated Successfully :)")
            this.snackBar.open("Succesfully Updated Profile", "Done", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "bottom",
              panelClass: ['.mat-snack-bar-container']
            })
          }).catch(err => {
            this.showSpinner = false;
            console.log(err);
            alert("Error Occured while updating student's profile :(")
          })
        }
      ).catch(err => {
        this.showSpinner = false;
        alert("Oops seems you have entered wrong password :( ")
      })
    }
    else{
      this.studentProfile.markAllAsTouched();
    }
  }

  updateTeacher() {
      if(!(this.teacherProfile.get("password").hasError("required") ||
      (this.teacherProfile.get("email").hasError("required") ||this.teacherProfile.get('email').hasError("email") )||
      (this.teacherProfile.get("mobile").hasError("required") ||this.teacherProfile.get('mobile').hasError("pattern"))||
      (this.teacherProfile.get("fullname").hasError("required") ||this.teacherProfile.get('fullname').hasError("pattern"))
      )){
        let upTeacher=new Teacher(this.teacherProfile.get("fullname").value,
        this.teacherProfile.get("mobile").value,
        this.teacherProfile.get("email").value,
        this.teacherProfile.get("facultyId").value);
        let user=new User(this.teacherProfile.get("facultyId").value,this.teacherProfile.get("password").value);
        this.dataService.verifyPassword(user).then(data=>{
          this.dataService.updateTeacher(upTeacher).then(responString=>{
            this.showSpinner = false;
            this.teacherProfile.get("password").patchValue("");
            this.teacherProfile.get("password").markAsUntouched();
            this.teacherProfile.get("password").updateValueAndValidity();
            alert("Teacher Details Updated Successfully :)")
            this.snackBar.open("Succesfully Updated Profile", "Done", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "bottom",
              panelClass: ['.mat-snack-bar-container']
            })
          }).catch(err => {
            this.showSpinner = false;
            console.log(err);
            alert("Error Occured while updating teacher's profile :(")
          })
        }).catch(err => {
          this.showSpinner = false;
          alert("Oops seems you have entered wrong password :( ")
        })
      }
      else{
        this.teacherProfile.markAllAsTouched();
      }

  }

}
