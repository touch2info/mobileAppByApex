import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'createMsg_Tsk', loadChildren: './create-msg-tsk/create-msg-tsk.module#CreateMsgTskPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
