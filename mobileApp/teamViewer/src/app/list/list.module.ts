import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { ListPage } from './list.page';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }, {
        path: ':id',
        component: MemberDetailsComponent
      }
    ])
  ],
  providers: [CallNumber, EmailComposer],
  declarations: [ListPage, MemberDetailsComponent, MemberDetailsComponent]
})
export class ListPageModule { }
