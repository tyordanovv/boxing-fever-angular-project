import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './profile/register/register.component';
import { LoginComponent } from './profile/login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserEditReactiveComponent } from './profile/user-edit-reactive.component/user-edit-reactive.component';
import { CreateSessionComponent } from './board-admin/session-section/create-session/create-session.component';
import { ClassesViewComponent } from './board-admin/class-section/classes-view/classes-view.component';
import { CreateClassComponent } from './board-admin/class-section/create-class/create-class.component';
import { ViewTrainerComponent } from './view.trainer/view.trainer.component';
import { EditTrainerComponent } from './edit.trainer/edit.trainer.component';
import { AllSessionsViewComponent } from './board-admin/session-section/all-sessions-view/all-sessions-view.component';
import {AllSessionsViewAdminComponent} from "./board-admin/session-section-admin/all-sessions-view-admin/all-sessions-view-admin.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: BoardUserComponent
  },
  {
    path: 'admin',
    component: BoardAdminComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'profile/edit',
    component: UserEditReactiveComponent
  },
  {
    path: 'session/all',
    component: AllSessionsViewComponent
  },
  {
    path: 'session/all-admin',
    component: AllSessionsViewAdminComponent
  },
  {
    path: 'session/create',
    component: CreateSessionComponent
  },
  {
    path: 'classes',
    component: ClassesViewComponent
    },
  {
    path: 'classes/new',
    component: CreateClassComponent
  },
  {
    path: 'trainer/all',
    component: ViewTrainerComponent
  },
  {
    path: 'trainer/create',
    component: EditTrainerComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
