import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  employees: Employee[] = [];
  positions: string[] = [];
  filteredEmployees: Employee[] = [];
  showAllEmployees: boolean = true;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.extractUniquePositions();
        this.filteredEmployees = [...this.employees];
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }

  extractUniquePositions(): void {
    const positionSet = new Set(this.employees.map(emp => emp.position));
    this.positions = Array.from(positionSet);
  }

  getCountByPosition(position: string): number {
    return this.employees.filter(emp => emp.position === position).length;
  }

  filterByPosition(position: string): void {
    this.filteredEmployees = this.employees.filter(emp => emp.position === position);
    this.showAllEmployees = false;
  }

  viewAllEmployees(): void {
    this.filteredEmployees = [...this.employees];
    this.showAllEmployees = true;
  }

  goToAddEmployee(): void {
    this.router.navigate(['/add']);
  }

  editEmployee(id: number): void {
    if (!id) {
      console.warn('Invalid ID');
      return;
    }
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id?: number): void {
    if (!id) {
      console.warn('Invalid ID');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    this.employeeService.delete(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
        this.extractUniquePositions();
        console.log(`Employee with ID ${id} deleted`);
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }
}
