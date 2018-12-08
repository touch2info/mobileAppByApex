import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member-model';
import { ActivatedRoute } from '@angular/router';
import { getTeamMembers } from 'src/app/mock/members';
import { find } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  public member: Member;
  public skills: Array<String>;
  constructor(
      private route: ActivatedRoute, private dataService: DataServiceService
  ) {
  }

  ngOnInit() {
      const routeParams = this.route.snapshot.params
      this.loadMemberDetail(routeParams.id);
  }

  loadMemberDetail(memberId: string) {
      const members = this.dataService.teamMembers;
      this.member = find(members, function (element) {
          return (element.id === parseFloat(memberId));
      });
      this.skills = this.member.skills;
      console.log(this.member);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

}
