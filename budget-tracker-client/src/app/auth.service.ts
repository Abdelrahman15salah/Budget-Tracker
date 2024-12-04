import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Your backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method: Sends login request to the backend and stores token if successful
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Logout method: Clears the token and redirects the user
  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Check if the user is authenticated by checking if the token exists and is not expired
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // You could add logic to check if the token is expired using a JWT library (e.g., `jwt-decode`)
    return token !== null;
  }

  // Optionally, get the decoded token to retrieve user info
  getUserInfo(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = atob(token.split('.')[1]); // Decode the token's payload
      return JSON.parse(payload);
    }
    return null;
  }
}
