const mysql = require("mysql2");
const inquirer = require("inquirer");
const Table = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "abc123",
    database: "employee_manager",
  },
  console.log("Connected to the employee_manager database.")
);
