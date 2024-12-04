import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  // Fetch dashboard data (income and savings goal)
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`, { headers: this.getAuthHeaders() });
  }

  // Fetch income
  getIncome(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/income/`, { headers: this.getAuthHeaders() });
  }

  // Fetch savings goal
  getSavingsGoal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/goals/`, { headers: this.getAuthHeaders() });
  }

  // Add new income
  addIncome(income: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/income/add`, income, { headers: this.getAuthHeaders() });
  }

  // Add new savings goal
  addSavingsGoal(goal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/goals/add`, goal, { headers: this.getAuthHeaders() });
  }

  // Delete income by id
  deleteIncome(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/income/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  // Delete savings goal by id
  deleteSavingsGoal(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/goals/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  // Generate financial report
  generateReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/generate`, { headers: this.getAuthHeaders() });
  }
}