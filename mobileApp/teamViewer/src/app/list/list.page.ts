import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ name: string; role: string; icon: string; id: string; }> = [];
  constructor(private http: HttpClient, private dataService: DataServiceService) {
  }

  ngOnInit() {
    this.http.get('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teammembers')
      .subscribe(data => {
        const items = [];
        data = JSON.parse(data.body)['teammbers'];
        this.dataService.teamMembers = data;
        data.forEach(element => {
          items.push({
            name: element.name,
            role: element.role,
            icon: 'person',
            id: element.id
          })
        })
        this.items = items;
      })
  }
}
    // this.teamMembers = getTeamMembers();
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
