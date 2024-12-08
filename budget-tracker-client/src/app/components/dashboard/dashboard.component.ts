import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  income: { source: string; amount: number }[] = [];
  expenses: { category: string; amount: number }[] = [];
  savingsGoals: { name: string; targetAmount: number; currentAmount: number }[] = [];
  report: any = null;
  savingsGoal: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  savingsGoalProgress: number = 0;  // Change to a single value

  incomeChartData: any;
  expenseChartData: any;

  chartOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    responsive: true,
  };

  constructor(
    private dashboardService: DashboardService,
    private expenseService: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getIncome();
    this.getExpenses();
    this.getSavingsGoal();
  }

  // Fetch income data and prepare chart
  getIncome(): void {
    this.dashboardService.getIncome().subscribe(
      (data: any[]) => {
        this.income = data;
        this.calculateTotalIncome();
        this.prepareIncomeChart();
      },
      (error) => {
        console.error('Error fetching income', error);
      }
    );
  }

  // Calculate the total income
  calculateTotalIncome(): void {
    this.totalIncome = this.income.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    this.calculateSavingsProgress();  // Recalculate progress whenever income changes
  }

  prepareIncomeChart(): void {
    const labels = this.income.map((incomeItem) => incomeItem.source);
    const data = this.income.map((incomeItem) => incomeItem.amount);

    this.incomeChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };
  }

  // Fetch expense data and prepare chart
  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(
      (data: any[]) => {
        this.expenses = data;
        this.calculateTotalExpenses();
        this.prepareExpenseChart();
      },
      (error) => {
        console.error('Error fetching expenses', error);
      }
    );
  }

  // Calculate the total expenses
  calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.calculateSavingsProgress();  // Recalculate progress whenever expenses change
  }

  prepareExpenseChart(): void {
    const labels = this.expenses.map((expense) => expense.category);
    const data = this.expenses.map((expense) => expense.amount);

    this.expenseChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#FFA07A', '#20B2AA', '#9370DB', '#FF4500'],
        },
      ],
    };
  }

  // Fetch savings goals and calculate progress
  getSavingsGoal(): void {
    this.dashboardService.getSavingsGoal().subscribe(
      (data: any[]) => {
        console.log('Fetched Savings Goal Data:', data);
        if (data && data.length > 0) {
          const firstGoal = data[0];
          this.savingsGoal = firstGoal.targetAmount ?? 0;
          this.calculateSavingsProgress();
          console.log('Updated Savings Goal:', this.savingsGoal); // Debugging line
        } else {
          this.savingsGoal = 0;
          this.calculateSavingsProgress();
          console.log('No Savings Goal Set'); // Debugging line
        }
      },
      (error) => {
        console.error('Error fetching savings goal', error);
      }
    );
  }
  
  // Calculate savings progress as a percentage
  calculateSavingsProgress(): void {
    if (this.savingsGoal > 0) {
      const availableSavings = this.totalIncome - this.totalExpenses;  // Calculate savings from income and expenses
      const progressPercentage = Math.min((availableSavings / this.savingsGoal) * 100, 100); // Ensure the progress is capped at 100%
      this.savingsGoalProgress = progressPercentage;
      console.log('Savings Goal Progress:', this.savingsGoalProgress); // Debugging line
    } else {
      this.savingsGoalProgress = 0; // If no goal, set progress to 0
      console.log('No Savings Goal Set'); // Debugging line
    }
    this.savingsGoalProgress = 50;  // Set this for testing
    this.cdr.detectChanges();  
    // Trigger change detection manually
  }
  // Generate report
  generateReport(): void {
    this.dashboardService.generateReport().subscribe(
      (data) => {
        this.report = data;
      },
      (error) => {
        console.error('Error generating report', error);
      }
    );
  }
}
