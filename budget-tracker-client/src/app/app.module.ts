import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard.service'; 
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
// import { BudgetComponent } from './budget/budget.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    // BudgetComponent ,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    
    FormsModule // Import HttpClientModule here
  ],
  providers: [DashboardService,JwtHelperService,  // Add JwtHelperService to providers
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => localStorage.getItem('token')  // Set the token getter function
      }
    },
    provideHttpClient()  // Use provideHttpClient to configure the HTTP client
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
