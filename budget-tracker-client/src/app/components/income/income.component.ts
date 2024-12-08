import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service'; // Create an Income Service
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  standalone:false,
})
export class IncomeComponent implements OnInit {
  incomes: any = [];
  newIncome: { amount: number; source: string; date: Date } = {
    amount: 0,
    source: '',
    date: new Date(),
  };
  showAddIncomeModal: boolean = false; 

  constructor(
    private incomeService: IncomeService,  // Inject income service
    private router: Router
  ) {}

  ngOnInit() {
    this.loadIncomes();
    
  }

  loadIncomes() {
    this.incomeService.getIncomes().subscribe((data) => {
      this.incomes = data;
    });
  }

  addIncome() {
    this.incomeService.addIncome(this.newIncome).subscribe((response) => {
      this.loadIncomes(); 
      this.showAddIncomeModal = false;  
    });
  }

  deleteIncome(id: string) {
    this.incomeService.deleteIncome(id).subscribe((response) => {
      this.loadIncomes();  // Refresh income list
    });

  }
  toggleAddIncomeModal() {
    this.showAddIncomeModal = !this.showAddIncomeModal;  // Toggle modal visibility
  }
}
