import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getTeamMembers } from 'src/app/mock/members'
import { Member } from 'src/app/model/member-model';
import { find } from 'lodash';

@Component({
    selector: 'app-details',
    templateUrl: 'details.page.html',
    styleUrls: ['details.page.scss']
})
export class DetailsPage implements OnInit {
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
