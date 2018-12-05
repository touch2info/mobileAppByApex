import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member-model';
import { getTeamMembers } from 'src/app/mock/members'

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private teamMembers: Array<Member> = [];
  public items: Array<{ name: string; role: string; icon: string; id: number; }> = [];
  constructor() {
  }

  ngOnInit() {
    this.teamMembers = getTeamMembers();
    this.teamMembers.forEach(element => {
      this.items.push({
        name: element.name,
        role: element.role,
        icon: 'person',
        id: element.id
      });
    });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
