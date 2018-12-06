import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>DTCC Team Companion</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>        
        <p>
          Welcome to the DTCC Team Companion App. This app will act as your all-time companion and will provide your team announcements, application critical issues, and tasks assigned to you.
        </p>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Enter your LanID Credentials</ion-card-subtitle>            
          </ion-card-header>          
          <ion-item>
            <ion-label position="fixed">Login ID</ion-label>
            <ion-input required type="text" placeholder="LanID"></ion-input>
            
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Password</ion-label>
            <ion-input required type="password" placeholder="password"></ion-input>

          </ion-item>          
          <ion-button href="/dashboard/ionic" size="small" shape="round" >Login</ion-button>
          <ion-button href="/profile/ionic" size="small" shape="round" >Cancel</ion-button>
        </ion-card>        
      </ion-content>
    ];
  }
}
