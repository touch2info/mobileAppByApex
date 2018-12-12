import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Member } from 'src/app/model/member-model';
import { ActivatedRoute } from '@angular/router';
import { getTeamMembers } from 'src/app/mock/members';
import { find } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
    public member: Member = null;
    public skills: Array<String>;
    private memberId: number = null;
    constructor(
        private route: ActivatedRoute, private dataService: DataServiceService,
        private callNumber: CallNumber,
        private emailComposer: EmailComposer,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.params
        this.memberId = parseInt(routeParams.id);
        this.loadMemberDetail(routeParams.id);
    }

    loadMemberDetail(memberId: string) {
        this.http.get(`https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teammembers/${memberId}`)
            .subscribe((data: Response) => {
                this.member = data['user'];
                this.skills = this.member.skills;
            });
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
