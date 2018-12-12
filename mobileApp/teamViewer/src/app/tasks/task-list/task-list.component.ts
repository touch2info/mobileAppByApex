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
  filterText: string = '';
  constructor(private http: HttpClient, public dataService: DataServiceService) { }

  ngOnInit() {
    this.http.get(`https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teamtasks?id=${this.dataService.user.id}&tag=${this.filterText}`).subscribe(data => {
      data = data.body.teamtasks;
      this.handleTasks(data);
    })
  }

  handleTasks(teamtasks) {
    this.dataService.tasks = teamtasks;
    const that = this;
    this.createdTasks = filter(teamtasks, function (data) {
      return data.creator.id === that.dataService.user.id;
    })
    this.workingTasks = filter(teamtasks, function (data) {
      return data.assignedTo && data.assignedTo.id === that.dataService.user.id;
    })
    this.teamsTasks = filter(teamtasks, function (data) {
      return (data.creator.id !== that.dataService.user.id) && (isEmpty(data.assignedTo) || data.assignedTo.id !== that.dataService.user.id);
    })
    this.groupContacts()
    console.log(this.createdTasks, this.workingTasks, this.teamsTasks);
  }

  groupContacts() {
    if (!isEmpty(this.createdTasks)) {
      const createdTask = {
        title: 'My Created Tasks',
        list: this.createdTasks
      }
      this.tasks.push(createdTask);
    }
    if (!isEmpty(this.workingTasks)) {
      const workingTasks = {
        title: 'My Current Tasks',
        list: this.workingTasks
      }
      this.tasks.push(workingTasks);
    }
    if (!isEmpty(this.teamsTasks)) {
      const teamsTasks = {
        title: 'My Team Tasks',
        list: this.teamsTasks
      }
      this.tasks.push(teamsTasks);
    }
  }

  getPriority(data) {
    if (data.priority.toLowerCase() == 'high') {
      return 'alert'
    }
    if (data.priority.toLowerCase() == 'medium') {
      return 'warning'
    }
    else {
      return ''
    }
  }

  getPriorityClass(data) {
    if (data.priority.toLowerCase() == 'high') {
      return 'high-priority'
    }
    if (data.priority.toLowerCase() == 'medium') {
      return 'med-priority'
    }
  }

  filterTextChange() {
    this.teamsTasks = [];
    this.tasks = [];
    this.http.get(`https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teamtasks?id=${this.dataService.user.id}&tag=${this.filterText}`).subscribe(data => {
      data = data['body'].teamtasks;
      this.handleTasks(data);
    })
  }
}
