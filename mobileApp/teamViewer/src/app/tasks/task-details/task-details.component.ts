import { Component, OnInit } from '@angular/core';
import { Task, User } from 'src/app/model/tasks-model';
import { ActivatedRoute } from '@angular/router';
import { teamtasks } from 'src/app/mock/tasks';
import { find, isEmpty } from 'lodash';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  taskDetail: Task = null;
  selectedUser: string = null;

  ngOnInit() {
    const routeParams = this.route.snapshot.params
    this.loadTaskDetail(routeParams.id);
  }

  loadTaskDetail(taskId) {
    const tasks: Array<Task> = teamtasks;
    this.taskDetail = find(tasks, function (element) {
      return (element.id === taskId);
    });
    console.log(this.taskDetail);
  }

  getStatusClass(status) {
    if(status.toLowerCase() == 'open') {
      return 'pending'
    }
    if(status.toLowerCase() == 'in progress') {
      return 'progress'
    }
    else {
      return 'closed'
    }
  }

  shouldDisplayNomination() {
    return this.taskDetail.status.toLowerCase() == 'open' && !isEmpty(this.taskDetail.interestedMembers)
  }

  shouldShowApprove() {
    return this.taskDetail.status.toLowerCase() == 'open' && (this.taskDetail.creator.id === '100000');
  }

  shouldShowApply() {
    return this.taskDetail.status.toLowerCase() == 'open' && (this.taskDetail.creator.id !== '100000');
  }

  shouldDisableRange() {
    return this.taskDetail.assignedTo && this.taskDetail.assignedTo.id !== "100000" && this.taskDetail.status.toLowerCase() != 'in progress'
  }

  shouldShowAssignee() {
    return this.taskDetail.status.toLowerCase() == 'open' && this.taskDetail.creator.id === '100000' && !isEmpty(this.taskDetail.interestedMembers);
  }
}
