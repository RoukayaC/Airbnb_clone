import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    OwnerDashboardComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
