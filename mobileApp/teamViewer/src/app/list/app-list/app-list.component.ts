import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  private appName: Array<{id: number, name: string}> = null;
  constructor(private http: HttpClient, private dataService: DataServiceService) { }

  ngOnInit() {
    this.http.get('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/appcontacts')
      .subscribe((data: Response) => {
        const responseData = data.body['appcontacts'];
        this.dataService.membersDetails = responseData;
        this.handleMemberDetails(responseData);
      });
  }

  mapMethod(appData) {
    return {
      name: appData['appName'],
      id: appData['id']
    }
  }
  handleMemberDetails(data) {
    this.appName = map(data, this.mapMethod);
  }
}
