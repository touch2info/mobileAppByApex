import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateMsgTskPage } from './create-msg-tsk.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMsgTskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateMsgTskPage]
})
export class CreateMsgTskPageModule {}
