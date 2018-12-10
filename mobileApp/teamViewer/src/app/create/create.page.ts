import { Component, OnInit } from '@angular/core';
//import { NavController, Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor() { 
    console.log("inside constructor function 11... ");
  }

  public paymentL = true;

  ngOnInit() {
    console.log("inside init function 22... ");
  }
  
  msgORType;
  msgBlock = false;
  taskBlock = false;
  displayMsgOrTask(){
    console.log("inside THE function 33<"+ this.msgORType+">");
    if(this.msgORType=='msg'){
      this.msgBlock=true;
      this.taskBlock=false;
    }
    if(this.msgORType=='task'){
      this.msgBlock=false;
      this.taskBlock=true;
    }
  }
  

  public event = {
    month: '2018-12-08',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

}
