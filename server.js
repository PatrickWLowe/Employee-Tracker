const mysql = require("mysql2");
const inquirer = require("inquirer");

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

const StartingQuestions = [
  {
    type: "list",
    name: "StartingQuestions",
    message: "What would you like to do?",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee role",
    ],
  },
];

const Start = async () => {
  const response = await inquirer
    .prompt(StartingQuestions)
    .then(function (response) {
      switch (response.StartingQuestions) {
        case "View all Departments":
          viewDepartments();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee role":
          updateEmployee();
          break;
      }
    });
};

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    Start();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    Start();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    Start();
  });
};

const Initialize = () => {
  console.log("App for tracking employees.");
  console.log("Please make a selection below:");
  Start();
};

Initialize();
