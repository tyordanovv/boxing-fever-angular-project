import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './profile/register/register.component';
import { LoginComponent } from './profile/login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserEditReactiveComponent } from './profile/user-edit-reactive.component/user-edit-reactive.component';
import { SessionsViewComponent } from './board-admin/session-section/sessions-view/sessions-view.component';
import { CreateSessionComponent } from './board-admin/session-section/create-session/create-session.component';

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
    component: SessionsViewComponent
  },
  { 
    path: 'session/create', 
    component: CreateSessionComponent
  },
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
