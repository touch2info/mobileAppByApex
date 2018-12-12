import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task, User } from 'src/app/model/tasks-model';
import { ActivatedRoute, Router } from '@angular/router';
import { find, isEmpty } from 'lodash';
import { Member } from 'src/app/model/member-model';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dataService: DataServiceService,
  private http: HttpClient, private router: Router) { }
  taskDetail: Task = null;
  selectedUser: string = null;
  completionPct: string = '';

  ngOnInit() {
    const routeParams = this.route.snapshot.params
    this.loadTaskDetail(routeParams.id);
  }

  loadTaskDetail(taskId) {
    const tasks: Array<Task> = this.dataService.tasks;
    this.taskDetail = find(tasks, function (element) {
      return (element.id === parseFloat(taskId));
    });
    console.log(this.taskDetail);
  }

  getTaskStatusClass() {
    if (this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open') {
      return 'pending'
    }
    if (this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'in progress') {
      return 'progress'
    }
    else {
      return 'closed'
    }
  }

  shouldDisplayNomination() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && !isEmpty(this.taskDetail.interestedMembers)
  }

  shouldShowApprove() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && (this.taskDetail.creator.id === this.dataService.user.id) && !isEmpty(this.taskDetail.interestedMembers);
  }

  shouldShowApply() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && (this.taskDetail.creator.id !== this.dataService.user.id);
  }

  shouldDisableRange() {
    if(this.taskDetail && this.taskDetail.assignedTo && this.taskDetail.assignedTo.id === this.dataService.user.id && this.taskDetail.taskStatus.toLowerCase() == 'in progress') {
      return false
    }
    return true
  }

  shouldShowAssignee() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && this.taskDetail.creator.id === this.dataService.user.id && !isEmpty(this.taskDetail.interestedMembers);
  }

  shouldShowClose() {
    return this.taskDetail && this.taskDetail.creator.id === this.dataService.user.id && (this.taskDetail.completionPct == "100") && (this.taskDetail.taskStatus != 'closed')
  }

  sliderOnChange(event) {
    this.completionPct = event.target.value.toString();
  }

  updateTask(action) {
    const payload = {};
    payload['type'] = 'UPDATE';
    if (action == 'approve') {
      const selectedUserName = find(this.taskDetail.interestedMembers, { id: this.selectedUser })['name'];
      payload['id'] = this.taskDetail.id;
      payload['taskStatus'] = 'in progress';
      payload['completionPct'] = 0;
      payload['assignedTo'] = {
        "id": this.selectedUser,
        "name": selectedUserName
      }
    }
    if (action == 'apply') {
      const interestedMembers: Array<Member> = this.taskDetail.interestedMembers || [];
      interestedMembers.push({ id: this.dataService.user.id, name: this.dataService.user.name });
      payload['id'] = this.taskDetail.id;
      payload['taskStatus'] = 'open';
      payload['completionPct'] = 0;
      payload['interestedMembers'] = interestedMembers;
    }
    if (action == 'update') {
      payload['id'] = this.taskDetail.id;
      payload['completionPct'] = this.completionPct
    }

    if (action == 'close') {
      payload['id'] = this.taskDetail.id;
      payload['taskStatus'] = 'closed'
    }
    this.http.post('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teamtasks',payload)
    .subscribe(data => {
      this.router.navigate(['tasks']);
    })
  }
}
