import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { ListPage } from './list.page';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { AppListComponent } from './app-list/app-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppListComponent
      }, {
        path: ':appName',
        component: ListPage
      }, {
        path: ':appName/:id',
        component: MemberDetailsComponent
      }
    ])
  ],
  providers: [CallNumber, EmailComposer],
  declarations: [ListPage, MemberDetailsComponent, MemberDetailsComponent, AppListComponent]
})
export class ListPageModule { }
