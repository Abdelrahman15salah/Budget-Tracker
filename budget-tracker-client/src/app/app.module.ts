import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service'; 
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GoalsComponent } from './components/goals/goals.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
// import { BudgetComponent } from './budget/budget.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    GoalsComponent,
    IncomeComponent,
    ExpensesComponent,
    // BudgetComponent ,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    
    FormsModule 
  ],
  providers: [DashboardService,JwtHelperService,  
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => localStorage.getItem('token')  
      }
    },
    provideHttpClient()  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
