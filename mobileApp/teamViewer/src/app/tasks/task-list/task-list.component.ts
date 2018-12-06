import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/tasks-model';
import { filter } from 'lodash';
import { teamtasks } from 'src/app/mock/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  createdTasks: Array<Task> = null;
  workingTasks: Array<Task> = null;
  teamsTasks: Array<Task> = null;
  constructor() { }

  ngOnInit() {
    this.createdTasks = filter(teamtasks, function(data) {
      return data.creator.id === "100000";
    })
    this.workingTasks = filter(teamtasks, function(data) {
      return data.assignedTo.id === "100000";
    })
    this.teamsTasks = filter(teamtasks, function(data) {
      return (data.creator.id !== "100000") && (data.assignedTo.id !== "100000");
    })
    console.log(this.createdTasks, this.workingTasks, this.teamsTasks);
  }
  getStatusClass(data) {
    if(data.status.toLowerCase() == 'open') {
      return 'pending'
    }
    if(data.status.toLowerCase() == 'in progress') {
      return 'progress'
    }
    else {
      return 'closed'
    }
  }

  getPriorityClass(data) {
    if(data.priority.toLowerCase() == 'high') {
      return 'high-priority'
    }
    if(data.priority.toLowerCase() == 'medium') {
      return 'med-priority'
    }
    else {
      return 'low-priority'
    }
  }

}
