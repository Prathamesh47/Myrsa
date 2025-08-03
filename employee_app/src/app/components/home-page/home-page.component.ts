import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [CommonModule, RouterModule,FormsModule],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  employees: Employee[] = [];
  positions: string[] = [];
  currentPosition: string | null = null;
  showAllEmployees = false;
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

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

  viewAllEmployees(): void {
    this.filteredEmployees = [...this.employees];
    this.showAllEmployees = true;
    this.currentPosition = null;
    this.searchTerm = '';
  }

  goToAddEmployee(): void {
    this.router.navigate(['/add']);
  }

  editEmployee(id: number): void {
    if (!id) return;
    this.router.navigate(['/edit', id]);
  }

  hideAllEmployees(): void {
    this.filteredEmployees = [];
    this.showAllEmployees = false;
    this.searchTerm = '';
  }

  deleteEmployee(id?: number): void {
    if (!id) return;
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    this.employeeService.delete(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
        this.extractUniquePositions();
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }

  deleteAllEmployees(): void {
    const confirmDelete = confirm('Are you sure you want to delete ALL employees?');
    if (!confirmDelete) return;

    const idsToDelete = this.employees.map(emp => emp.id).filter(id => id !== undefined) as number[];

    idsToDelete.forEach(id => {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
          this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
          this.extractUniquePositions();
        },
        error: (err) => console.error('Error deleting employee:', err)
      });
    });
  }

  filterByPosition(pos: string) {
    this.currentPosition = pos;
    this.showAllEmployees = false;
    this.searchTerm = '';
    this.filteredEmployees = this.employees.filter(emp => emp.position === pos);
  }

  clearFilteredPosition() {
    this.currentPosition = null;
    this.filteredEmployees = [];
  }

  onSearch(): void {
    const lowerTerm = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp => emp.name.toLowerCase().includes(lowerTerm));
    this.currentPosition = null;
  }
}
