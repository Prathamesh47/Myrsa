import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private svc: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.svc.get(this.id).subscribe(emp => this.form.patchValue(emp));
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const emp: Employee = this.form.value;

    if (this.id) {
      this.svc.update(this.id, emp).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.handleError(err);
        }
      });
    } else {
      this.svc.create(emp).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.handleError(err);
        }
      });
    }
  }
  handleError(error: any) {
    if (error.status === 400) {
      alert('Error: Email already exists. Please use a different email.');
    } else {
      alert('An unexpected error occurred. Please try again later.');
      console.error(error);
    }
  }

  
}
