import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

export const createEmployee = (req: Request, res: Response) => {
  const employee: Employee = req.body;

  EmployeeService.create(employee, (err: any, result: any) => {
    if (err) {
      const statusCode = err.statusCode || 500; 
      return res.status(statusCode).json({ error: err.message });
    }

    res.status(201).json({ id: result.insertId, ...employee });
  });
};


export const getAllEmployees = (req: Request, res: Response) => {
  const keyword = req.query.Name as string | undefined;
  EmployeeService.findAll(keyword, (err: any, results: any) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

export const getEmployeeById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  EmployeeService.findById(id, (err: any, employee: any) => {
    if (err) return res.status(500).send(err);
    res.send(employee);
  });
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const employee: Employee = req.body;
  EmployeeService.update(id, employee, (err: any) => {
    if (err) return res.status(500).send(err);
    res.send({ id, ...employee });
  });
};

export const deleteEmployee = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  EmployeeService.delete(id, (err: any) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Employee deleted successfully' });
  });
};

export const deleteAllEmployees = (_req: Request, res: Response) => {
  EmployeeService.deleteAll((err: any) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'All employees deleted successfully' });
  });
};
