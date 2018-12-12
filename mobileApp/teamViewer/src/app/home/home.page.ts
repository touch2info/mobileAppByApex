import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private userName: string = '';
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.userName = this.dataService.user.name;
  }
}
