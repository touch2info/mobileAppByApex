import { Component, OnInit } from '@angular/core';
import { Task, User } from 'src/app/model/tasks-model';
import { ActivatedRoute } from '@angular/router';
import { find, isEmpty } from 'lodash';
import { Member } from 'src/app/model/member-model';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dataService: DataServiceService) { }
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
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && (this.taskDetail.creator.id === '100000') && !isEmpty(this.taskDetail.interestedMembers);
  }

  shouldShowApply() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && (this.taskDetail.creator.id !== '100000');
  }

  shouldDisableRange() {
    return this.taskDetail && this.taskDetail.assignedTo && this.taskDetail.assignedTo.id !== "100000" && this.taskDetail.taskStatus.toLowerCase() != 'in progress'
  }

  shouldShowAssignee() {
    return this.taskDetail && this.taskDetail.taskStatus.toLowerCase() == 'open' && this.taskDetail.creator.id === '100000' && !isEmpty(this.taskDetail.interestedMembers);
  }

  shouldShowClose() {
    return this.taskDetail && this.taskDetail.creator.id === '100000' && (this.taskDetail.completionPct == "100")
  }

  sliderOnChange(event){
    this.completionPct = event.target.value.toString();
  }

  updateTask(action) {
    if (action == 'approve') {
      const selectedUserName = find(this.taskDetail.interestedMembers, { id: this.selectedUser })['name'];
      const payload = {
        "id": this.taskDetail.id,
        "taskStatus": "in progress",
        "assignedTo": {
          "id": this.selectedUser,
          "name": selectedUserName
        }
      }
      console.log(payload);
    }
    if (action == 'apply') {
      const interestedMembers: Array<Member> = this.taskDetail.interestedMembers;
      interestedMembers.push({ id: 100000, name: 'Ajjan M' });
      const payload = {
        "id": this.taskDetail.id,
        "interestedMembers": interestedMembers
      }
      console.log(payload);
    }
    if (action == 'update') {
      const payload = {
        "id": this.taskDetail.id,
        "completionPct": this.completionPct
      }
      console.log(payload);
    }

    if (action == 'close') {
      const payload = {
        "taskStatus": 'closed'
      }
      console.log(payload);
    }
  }
}
