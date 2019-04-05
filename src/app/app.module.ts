import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SignUpService} from './services/sign-up.service';


import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    SignUpFormComponent,
    LoginFormComponent,
    AdminPageComponent,
    AdminDashboardComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([

      {
        path: '', component: PageComponent,
      },
      {
        path: 'setMyHome/signUp', component: SignUpComponent
      },
      {
        path: 'setMyHome/login', component: LoginComponent
      },
      {
        path: 'setMyHome/admin', component: AdminPageComponent
      },
      {
        path: 'setMyHome/logout', component: LogoutComponent
      }
      
    ])
  ],
  providers: [SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
