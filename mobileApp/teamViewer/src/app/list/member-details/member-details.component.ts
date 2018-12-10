import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Member } from 'src/app/model/member-model';
import { ActivatedRoute } from '@angular/router';
import { getTeamMembers } from 'src/app/mock/members';
import { find } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
    public member: Member;
    public skills: Array<String>;
    constructor(
        private route: ActivatedRoute, private dataService: DataServiceService,
        private callNumber: CallNumber,
        private emailComposer: EmailComposer
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

    callMember() {
        this.callNumber.callNumber(`${this.member.phone}`, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
    }

    emailMember() {
        this.emailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                //Now we know we can send
                let email = {
                    to: `${this.member.mail}`,
                    isHtml: true
                }

                // Send a text message using default options
                this.emailComposer.open(email);
            }
        });
    }
    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }

}
