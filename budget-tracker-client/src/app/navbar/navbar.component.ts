import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

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

  
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;  
  }

  // Sign out the user
  signOut() {
    this.authService.logout(); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']);  
  }
}
