import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'lodash';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private userName: string = '';
  private messages: string = '';  
  constructor(private http: HttpClient, private dataService: DataServiceService) { }

  ngOnInit() {
    this.userName = this.dataService.user.name;
    this.http.get('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/teambroadcasts?today=2018-12-18')
      .subscribe((data: Response) => {
        const responseData = data.body['teambroadcasts'];  
        this.messages=responseData;        
      });
  }
}
