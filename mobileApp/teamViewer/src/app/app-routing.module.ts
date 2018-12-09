import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

    redirectTo: 'home',
    pathMatch: 'full'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'tasks',
    loadChildren: './tasks/tasks.module#TasksModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'createMsg_Tsk', loadChildren: './create-msg-tsk/create-msg-tsk.module#CreateMsgTskPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
