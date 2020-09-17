import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
      this.loginForm.reset();
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      this.signupForm.reset();
    });

  }

  loginForm =new FormGroup({
    username:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(3)])
  })

  signupForm=new FormGroup({
    fullname:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]+[' ']{0,1}[a-zA-Z]+[' ']{0,1}[a-zA-Z]+"), Validators.nullValidator]),
    enrollment:new FormControl(null,[Validators.required,Validators.pattern("[0-9]{4}[a-zA-Z]{2}[0-9]{6}")]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    mobile:new FormControl(null,[Validators.required,Validators.pattern("[0-9]{10}")]),
    username:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z0-9]{3,}")]),
    password:new FormControl(null,[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}')])
  })

  loginUser(){
    alert("it works");
  }

  signUpUser(){
    alert("It works");
  }


}
