import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'owner-dashboard', component: OwnerDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
];


  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
