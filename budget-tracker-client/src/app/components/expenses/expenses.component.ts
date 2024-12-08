import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service'; // Create an Expense Service

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  standalone: false,
})
export class ExpensesComponent implements OnInit {
  expenses: any = [];
  newExpense: { amount: number; category: string; date: Date } = {
    amount: 0,
    category: '',
    date: new Date(),
  };

  showAddExpenseModal: boolean = false;  // Add this property to control the modal visibility

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }

  addExpense() {
    this.expenseService.addExpense(this.newExpense).subscribe((response) => {
      this.loadExpenses();  // Refresh expense list
      this.showAddExpenseModal = false; // Close the modal after adding the expense
    });
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe((response) => {
      this.loadExpenses();  // Refresh expense list
    });
  }
}
