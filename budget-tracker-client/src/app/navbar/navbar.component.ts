import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Make sure to import your AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,  
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  // Check if the user is logged in (by checking the token in local storage)
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;  // If token exists, user is logged in
  }

  // Sign out the user
  signOut() {
    this.authService.logout();  // Clear the authentication data
    this.isLoggedIn = false;  // Update the local state
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
