import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member-model';
import { ActivatedRoute } from '@angular/router';
import { getTeamMembers } from 'src/app/mock/members';
import { find } from 'lodash';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  public member: Member;
  constructor(
      private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
      const routeParams = this.route.snapshot.params
      this.loadMemberDetail(routeParams.id);
  }

  loadMemberDetail(memberId: string) {
      const members: Array<Member> = getTeamMembers();
      this.member = find(members, function (element) {
          return (element.id === parseInt(memberId));
      });
      console.log(this.member);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

}
