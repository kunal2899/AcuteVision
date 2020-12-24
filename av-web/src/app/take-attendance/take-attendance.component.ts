import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css']
})
export class TakeAttendanceComponent implements OnInit {

  constructor() { }

  result_fetched:boolean

  dept = ['CSE','IT','ECE','EEE','EE','ME','CE','AE','EIE','PE','ChE']
  sem = [1,2,3,4,5,6,7,8]
  sec = ['A','B','C','D']
  class = ['G6','G7','G12']
  sub = ['BT-201','CS-605','CS-897']

  strength = 80
  total = 32
  present = 30
  absent = this.strength - this.present

  ngOnInit(): void {
    this.result_fetched = false
  }

  takeAttendance(){
    this.result_fetched = true
  }

  take(){
    this.result_fetched = false
  }

}
