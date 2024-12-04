import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';  
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';  


// import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },

 
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
