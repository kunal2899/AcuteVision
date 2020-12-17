import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  public isTeacher: boolean = false;
  constructor() {
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
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      this.signupForm1.reset();
    });

    this.signupForm1.controls["userType"].patchValue("Student")
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
    facultyId: new FormControl(null, [Validators.required,Validators.minLength(5)])
  })

  loginUser() {
    if (this.loginForm.valid) {
      alert("it works");
    } else {
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



  signUpUser() {
    if (this.signupForm1.valid) {
      if(this.signupForm1.get("userType").value=="teacher"){
        document.getElementById("user_form").style.display="none"
        document.getElementById("teacher_form").style.display="flex"
      }
      else{
        document.getElementById("user_form").style.display="none"
        document.getElementById("student_form").style.display="flex"
      }
    } else {
      this.signupForm1.markAllAsTouched()
    }
  }

  saveTeacherProfile() {
    if(this.signupTeacherForm.valid)
      alert("teacherSaved")
    else{
      this.signupTeacherForm.markAllAsTouched();
      alert("error")
    }
  }
  saveStudentProfile(){
    this.signupStudentForm.controls["enrollment"].setValidators(null);
    this.signupStudentForm.controls["enrollment"].updateValueAndValidity();
    if(this.signupStudentForm.valid){
      alert("studentSaved")
    }
    else{
      this.signupStudentForm.markAllAsTouched();
      alert("error")
    }
  }


}
