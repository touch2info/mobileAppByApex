import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
//import { NavController, Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { isEmpty } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private dataService: DataServiceService,
    private http: HttpClient,
    private router: Router) {
    console.log("inside constructor function 11... ");
  }

  public paymentL = true;
  private tags: Array<string> = [];
  private tag: string = '';
  private title: string = '';
  private description: string = '';
  private points: string = '';
  private priority: number = 0;
  private sendNotification: boolean = false;
  private dueDate: string = moment().format('YYYY-MM-DD');
  private startDate: string = moment().format('YYYY-MM-DD');
  ngOnInit() {
    console.log("inside init function 22... ");
  }

  msgORType;
  msgBlock = false;
  taskBlock = false;
  displayMsgOrTask() {
    console.log("inside THE function 33<" + this.msgORType + ">");
    if (this.msgORType == 'msg') {
      this.msgBlock = true;
      this.taskBlock = false;
    }
    if (this.msgORType == 'task') {
      this.msgBlock = false;
      this.taskBlock = true;
    }
  }


  public event = {
    month: '2018-12-08',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  addTags() {
    if (!isEmpty(this.tag) && !this.tags.includes(this.tag)) {
      this.tags.push(this.tag);
      this.tag = '';
    }
  }
  submit() {
    const payload = {};
    if (this.taskBlock) {
      payload['type'] = 'CREATE'
      payload['title'] = this.title;
      payload['taskStatus'] = 'open';
      payload['targetDate'] = this.dueDate;
      payload['tags'] = this.tags;
      payload['priority'] = (this.priority == 3) ? 'high' : (this.priority == 2) ? 'medium' : 'low';
      payload['description'] = this.description;
      payload['creator'] = this.dataService.user;
      payload['completionPct'] = '0';
      payload['points'] = this.points;
      payload['id'] = this.dataService.getId();
      this.http.post('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teamtasks', payload)
        .subscribe(data => {
          this.router.navigate(['tasks']);
        });
    }
    if (this.msgBlock) {
      payload['title'] = this.title;
      payload['startDate'] = this.startDate;
      payload['endDate'] = this.dueDate;
      payload['priority'] = (this.priority == 3) ? 'high' : (this.priority == 2) ? 'medium' : 'low';
      payload['message'] = this.description;
      payload['id'] = this.dataService.getId();
      this.http.post('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teambroadcasts', payload)
        .subscribe(data => {
          this.router.navigate(['home']);
        });
    }

  }

}
