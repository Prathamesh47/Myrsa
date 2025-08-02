import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private svc: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.svc.getAll().subscribe(data => this.employees = data);
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.svc.delete(id).subscribe(() => this.loadEmployees());
    }
  }
}
