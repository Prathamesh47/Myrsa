import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, data);
  }

  update(id: number, data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  searchByName(keyword: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}?Name=${keyword}`);
  }
}
