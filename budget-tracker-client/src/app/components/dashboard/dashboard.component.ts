import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  income: { source: string; amount: number }[] = [];
  expenses: { category: string; amount: number }[] = [];
  savingsGoal: number = 0;
  totalSavings: number = 0;
  report: any = null;

  incomeChartData: any;
  expenseChartData: any;
  savingsGoalProgress: number = 0;

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
    private expenseService: ExpenseService
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
        this.prepareIncomeChart();
      },
      (error) => {
        console.error('Error fetching income', error);
      }
    );
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
        this.prepareExpenseChart();
      },
      (error) => {
        console.error('Error fetching expenses', error);
      }
    );
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

  // Fetch savings goal and calculate progress
  getSavingsGoal(): void {
    this.dashboardService.getSavingsGoal().subscribe(
      (data: any) => {
        this.savingsGoal = data.targetAmount || 0;
        this.totalSavings = data.currentSavings || 0;
        this.calculateSavingsProgress();
      },
      (error) => {
        console.error('Error fetching savings goal', error);
      }
    );
  }

  calculateSavingsProgress(): void {
    if (this.savingsGoal > 0) {
      this.savingsGoalProgress = (this.totalSavings / this.savingsGoal) * 100;
    } else {
      this.savingsGoalProgress = 0;
    }
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