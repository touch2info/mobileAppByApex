import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { find, isEmpty } from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private appId: string = ';'
  public items: Array<{ name: string; role: string; icon: string; id: string; }> = [];
  private teamMembers: any = null;
  private membersGrouping: Array<any> = [];
  constructor(private http: HttpClient, private dataService: DataServiceService,
    private route: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.http.get('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teammembers')
      .subscribe((data: Response) => {
        const items = [];
        const responseData = data['body']['teamMembers'];
        this.dataService.teamMembers = responseData;
        responseData.forEach(element => {
          items.push({
            name: element.name,
            role: element.role,
            icon: 'person',
            id: element.id
          })
        })
        this.items = items;
      })
    const routeParams = this.route.snapshot.params
    this.appId = routeParams.appName;
    this.loadMembers(routeParams.appName);
  }

  loadMembers(id) {
    const memberDetails = this.dataService.membersDetails;
    this.teamMembers = find(memberDetails, { 'id': parseInt(id) });
    this.buildMembersData(this.teamMembers);
  }

  buildMembersData(data) {
    if (!isEmpty(data['ADContacts'])) {
      const members = {
        title: 'AD Members',
        list: data['ADContacts']
      }
      this.membersGrouping.push(members);
    }
    if (!isEmpty(data['EAScontacts'])) {
      const members = {
        title: 'EAS Members',
        list: data['EAScontacts']
      }
      this.membersGrouping.push(members);
    }
    if (!isEmpty(data['UATcontacts'])) {
      const members = {
        title: 'UAT Members',
        list: data['UATcontacts']
      }
      this.membersGrouping.push(members);
    }
    if (!isEmpty(data['productmgmtContact'])) {
      const members = {
        title: 'Product Members',
        list: data['productmgmtContact']
      }
      this.membersGrouping.push(members);
    }
  }
}
    // this.teamMembers = getTeamMembers();
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
