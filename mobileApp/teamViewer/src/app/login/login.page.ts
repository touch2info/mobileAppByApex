import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/data-service.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string = '';
  password: string = '';
  errorMsg: string = '';
  constructor(private http: HttpClient,
    public dataService: DataServiceService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const payload = {};
    if (!isEmpty(this.userName) && !isEmpty(this.password)) {
      payload['userid'] = this.userName;
      payload['password'] = this.password;
    }
    this.http.post('https://lvpcxvos1f.execute-api.us-east-1.amazonaws.com/dev/', payload)
      .subscribe(data => {
        if (data.status == 'success') {
          this.dataService.user = data.user;
          this.router.navigate(['home']);
        }
        else {
          this.errorMsg = data.msg;
        }
      })
  }

}
