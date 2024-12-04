import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';  
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';  // Import AuthGuard

// Import any other components you might need to protect
// import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [
  // Routes that do not require authentication
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Protected routes, guarded by AuthGuard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },

  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Optional: Catch-all route for undefined paths
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
