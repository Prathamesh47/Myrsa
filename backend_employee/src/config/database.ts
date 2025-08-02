import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tushar1784@',
  database: 'employees_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});