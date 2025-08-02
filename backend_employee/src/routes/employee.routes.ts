import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployees
} from '../controllers/employee.controller';

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.delete('/', deleteAllEmployees);

export default router;