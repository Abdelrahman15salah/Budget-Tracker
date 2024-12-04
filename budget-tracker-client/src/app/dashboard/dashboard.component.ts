import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  income: { source: string, amount: number, _id: string }[] = [];
  expenses: any[] = [];
  savingsGoal: number = 0;
  report: any = null;
  isLoading: boolean = false;
  hasExpenses: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';  


  newExpense: any = { category: '', amount: 0, description: '' };
  newIncome: any = { source: '', amount: 0 };
  newSavingsGoal: any = { goalName: '', targetAmount: 0 };

  constructor(
    private dashboardService: DashboardService,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFinancialData();
    this.getExpenses();
    this.getIncome();
    this.getSavingsGoal();
  }


  getFinancialData(): void {
    this.isLoading = true;
    this.dashboardService.getDashboardData().subscribe(
      (data: any) => {
        this.income = data.income || 0;
        this.savingsGoal = data.savingsGoal || 0;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching financial data', error);
        this.errorMessage = 'Could not fetch financial data. Please try again.';
        this.isLoading = false;
      }
    );
  }
  getExpenses(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.expenseService.getExpenses().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.expenses = data;
          this.hasExpenses = this.expenses.length > 0;
        } else {
          console.error('Invalid data format for expenses', data);
          this.errorMessage = 'Failed to load expenses data.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching expenses', error);
        this.errorMessage = 'Could not fetch expenses. Please try again.';
        this.isLoading = false;
      }
    );
  }


  getIncome(): void {
    this.dashboardService.getIncome().subscribe(
      (data: any[]) => {
        console.log('Income data fetched:', data);  
        this.income = data; 
      },
      (error) => {
        console.error('Error fetching income', error);
        this.errorMessage = 'Could not fetch income. Please try again.';
      }
    );
  }
  get totalIncome(): number {
    return this.income.reduce((total, currentIncome) => total + currentIncome.amount, 0);
  }
  
  // Fetch savings goal
  getSavingsGoal(): void {
    this.dashboardService.getSavingsGoal().subscribe(
      (data: any) => {
        this.savingsGoal = data.targetAmount || 0;
      },
      (error) => {
        console.error('Error fetching savings goal', error);
        this.errorMessage = 'Could not fetch savings goal. Please try again.';
      }
    );
  }


  addExpense(): void {
    this.expenseService.addExpense(this.newExpense).subscribe(
      () => {
        this.getExpenses();  
        this.successMessage = 'Expense added successfully!';
        this.newExpense = { category: '', amount: 0, description: '' };
      },
      (error) => {
        console.error('Error adding expense', error);
        this.errorMessage = 'Failed to add expense. Please try again.';
      }
    );
  }


  addIncome(): void {
    this.dashboardService.addIncome(this.newIncome).subscribe(
      () => {
        this.getIncome();  
        this.successMessage = 'Income added successfully!';
        console.log('New Income:', this.newIncome);
        
        this.newIncome = { source: '', amount: 0 };  
      },
      (error) => {
        console.error('Error adding income', error);
        this.errorMessage = 'Failed to add income. Please try again.';
      }
    );
  }
  
  

 
  addSavingsGoal(): void {
    this.dashboardService.addSavingsGoal(this.newSavingsGoal).subscribe(
      () => {
        this.getSavingsGoal();  
        this.successMessage = 'Savings goal added successfully!';
        this.newSavingsGoal = { goalName: '', targetAmount: 0 };
      },
      (error) => {
        console.error('Error adding savings goal', error);
        this.errorMessage = 'Failed to add savings goal. Please try again.';
      }
    );
  }

  // Delete expense
  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id).subscribe(
      () => {
        this.getExpenses();  
        this.successMessage = 'Expense deleted successfully!';
      },
      (error) => {
        console.error('Error deleting expense', error);
        this.errorMessage = 'Failed to delete expense. Please try again.';
      }
    );
  }

  // Delete income
  deleteIncome(incomeId: string): void {
    this.dashboardService.deleteIncome(incomeId).subscribe(
      () => {
        this.getIncome();  
        this.successMessage = 'Income deleted successfully!';
      },
      (error) => {
        console.error('Error deleting income', error);
        this.errorMessage = 'Failed to delete income. Please try again.';
      }
    );
  }


  deleteSavingsGoal(id: string): void {
    this.dashboardService.deleteSavingsGoal(id).subscribe(
      () => {
        this.getSavingsGoal();  
        this.successMessage = 'Savings goal deleted successfully!';
      },
      (error) => {
        console.error('Error deleting savings goal', error);
        this.errorMessage = 'Failed to delete savings goal. Please try again.';
      }
    );
  }

 
  generateReport(): void {
    this.dashboardService.generateReport().subscribe(
      (data) => {
        this.report = data;
      },
      (error) => {
        console.error('Error generating report', error);
        this.errorMessage = 'Could not generate report. Please try again.';
      }
    );
  }
}