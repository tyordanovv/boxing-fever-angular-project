import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatCardModule} from "@angular/material/card";
import { TrainerSectionComponent } from './board-admin/trainer-section/trainer-section.component';
import { ClassSectionComponent } from './board-admin/class-section/class-section.component';
import { SessionSectionComponent } from './board-admin/session-section/session-section.component';
import { CreateClassComponent } from './board-admin/class-section/create-class/create-class.component';
import { ClassesViewComponent } from './board-admin/class-section/classes-view/classes-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardUserComponent,
    UserProfileComponent,
    BoardAdminComponent,

    SessionSectionComponent,
    ClassSectionComponent,
    TrainerSectionComponent,
    CreateClassComponent,
    ClassesViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
