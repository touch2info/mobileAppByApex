import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular'
import { Task } from 'src/app/model/tasks-model';
import { filter, isEmpty } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  createdTasks: Array<Task> = null;
  workingTasks: Array<Task> = null;
  teamsTasks: Array<Task> = null;
  tasks: Array<any> = [];
  constructor(private http: HttpClient, public dataService: DataServiceService) { }

  ngOnInit() {
    this.http.get('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teamtasks')
      .subscribe(data => {
        data = data.body.teamtasks;
        this.handleTasks(data);
      })
  }

  handleTasks(teamtasks) {
    this.dataService.tasks = teamtasks;
    this.createdTasks = filter(teamtasks, function (data) {
      return data.creator.id === 100000;
    })
    this.workingTasks = filter(teamtasks, function (data) {
      return data.assignedTo && data.assignedTo.id === 100000;
    })
    this.teamsTasks = filter(teamtasks, function (data) {
      return (data.creator.id !== 100000) && (data.assignedTo && data.assignedTo.id !== 100000);
    })
    this.groupContacts()
    console.log(this.createdTasks, this.workingTasks, this.teamsTasks);
  }

  groupContacts() {
    if(!isEmpty(this.createdTasks)) {
      const createdTask = {
        title: 'Created Tasks',
        list: this.createdTasks
      }
      this.tasks.push(createdTask);
    }
    if(!isEmpty(this.workingTasks)) {
      const workingTasks = {
        title: 'Assigned Tasks',
        list: this.workingTasks
      }
      this.tasks.push(workingTasks);
    }
    if(!isEmpty(this.teamsTasks)) {
      const teamsTasks = {
        title: 'My Teams Tasks',
        list: this.teamsTasks
      }
      this.tasks.push(teamsTasks);
    }
  }

  getTaskStatusClass(data) {
    if (data.taskStatus.toLowerCase() == 'open') {
      return 'pending'
    }
    if (data.taskStatus.toLowerCase() == 'in progress') {
      return 'progress'
    }
    else {
      return 'closed'
    }
  }

  getPriorityClass(data) {
    if (data.priority.toLowerCase() == 'high') {
      return 'high-priority'
    }
    if (data.priority.toLowerCase() == 'medium') {
      return 'med-priority'
    }
    else {
      return 'low-priority'
    }
  }
}
