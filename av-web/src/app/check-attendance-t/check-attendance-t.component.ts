import { Component, OnInit } from '@angular/core';

class data {
  constructor(
    private enrollment,
    private present,
    private absent,
    private percent
  ){}
}

class sub{
  constructor(
    private sub_code,
    private details:data[]
  ){}
}

@Component({
  selector: 'app-check-attendance-t',
  templateUrl: './check-attendance-t.component.html',
  styleUrls: ['./check-attendance-t.component.css']
})
export class CheckAttendanceTComponent implements OnInit {

  constructor() { }

  result_fetched:boolean

  data1 = new data('0103CS181072',23,8,65)
  data2 = new data('0103CS181077',43,4,55)
  data3 = new data('0103CS181078',36,18,35)
  data4 = new data('0103CS181079',53,2,85)
  data5 = new data('0103CS181072',23,8,65)
  data6 = new data('0103CS181077',43,4,55)
  data7 = new data('0103CS181078',36,18,35)
  data8 = new data('0103CS181079',53,2,85)

  sub1 = new sub('BT-203',[this.data1,this.data2,this.data3,this.data4])
  sub2 = new sub('BT-205',[this.data5,this.data6,this.data7,this.data8])

  tables = [this.sub1,this.sub2]

  dept = ['CSE','IT','ECE','EEE','EE','ME','CE','AE','EIE','PE','ChE']
  sem = [1,2,3,4,5,6,7,8]
  sec = ['A','B','C','D']
  class = ['G6','G7','G12']
  sub = ['CS-605','CS-897']

  strength = 80
  total = 32
  present = 30
  absent = this.strength - this.present

  ngOnInit(): void {
    this.result_fetched = false
  }

  checkAttendance(){
    this.result_fetched = true
  }

  check(){
    this.result_fetched = false
  }

}
