import { db } from '../config/database';
import { Employee } from '../models/employee.model';
import { RowDataPacket } from 'mysql2';


export const EmployeeService = {
    create: (employee: Employee, callback: Function) => {
    const { name, email, position } = employee;

    // First check if email already exists
    db.query<RowDataPacket[]>(
      'SELECT * FROM employees WHERE email = ?', 
      [email], 
      (err, result) => {
        if (err) return callback(err);

        if ((result as RowDataPacket[]).length > 0) {
          // Email already exists
          return callback(new Error('Employee with this email already exists'));
        }

        // Proceed to insert
        db.query(
          'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
          [name, email, position],
          (err, insertResult) => callback(err, insertResult)
        );
      }
    );
  },
  findAll: (keyword: string | undefined, callback: Function) => {
    const query = keyword
      ? 'SELECT * FROM employees WHERE name LIKE ?'
      : 'SELECT * FROM employees';
    const values = keyword ? [`%${keyword}%`] : [];
    db.query(query, values, (err, results) => callback(err, results));
  },

  findById: (id: number, callback: Function) => {
    db.query<RowDataPacket[]>(
      'SELECT * FROM employees WHERE id = ?', 
      [id], 
      (err, result) => {
        const employee = (result as RowDataPacket[])[0]; 
        callback(err, employee);
      }
    );
  },

  update: (id: number, employee: Employee, callback: Function) => {
    const { name, email, position } = employee;
    db.query('UPDATE employees SET name=?, email=?, position=? WHERE id=?',
      [name, email, position, id],
      (err) => callback(err));
  },

  delete: (id: number, callback: Function) => {
    db.query('DELETE FROM employees WHERE id=?', [id], (err) => callback(err));
  },

  deleteAll: (callback: Function) => {
    db.query('DELETE FROM employees', (err) => callback(err));
  },
};