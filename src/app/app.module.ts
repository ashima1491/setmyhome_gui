import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SignUpService} from './services/sign-up.service';
import {Ng2SmartTableModule} from 'ng2-smart-table'


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventformComponent } from './components/eventform/eventform.component';
import { NonadminDashboardComponent } from './components/nonadmin-dashboard/nonadmin-dashboard.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BookingListByUserComponent } from './components/booking-list-by-user/booking-list-by-user.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignUpFormComponent,
    LoginFormComponent,
    AdminDashboardComponent,
    LogoutComponent,
    UserListComponent,
    FooterComponent,
    EventformComponent,
    NonadminDashboardComponent,
    BookingComponent,
    BookingListComponent,
    ContactUsComponent,
    BookingListByUserComponent,
    TestimonialComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    RouterModule.forRoot([

      {
        path: '', component: HomeComponent,
      },
      {
        path: 'setMyHome/signUp', component: SignUpFormComponent
      },
      {
        path: 'setMyHome/login', component: LoginFormComponent
      },
      {
        path: 'setMyHome/admin', component: AdminDashboardComponent
      },
      {
        path: 'setMyHome/logout', component: LogoutComponent
      },
      {
        path: 'setMyHome/admin/userList', component: UserListComponent
      },
      {
        path: 'setMyHome/admin/eventPage', component: EventformComponent
      },
      {
        path: 'setMyHome/admin/bookings', component: BookingListComponent
      },
      {
        path: 'setMyHome/nonadmin', component: NonadminDashboardComponent
      },
      {
        path: 'setMyHome/nonadmin/booking', component: BookingComponent
      },
      {
        path: 'setMyHome/nonadmin/booking/view', component: BookingListByUserComponent
      },
      {
        path: 'setMyHome/contactUs', component: ContactUsComponent
      },
      {
        path: 'setMyHome/testimonials', component: TestimonialComponent
      },
      {
        path: 'setMyHome/blog', component: BlogComponent
      }
    ])
  ],
  providers: [SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
