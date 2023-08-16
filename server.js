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

const Start = () => {
  inquirer
    .prompt([
      {
        name: "StartingQuestions",
        type: "list",
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
    ])
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

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO department SET ?",
        { name: response.department },
        function (err, res) {
          if (err) throw err;
          console.log("Department added.");
          Start();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role you would like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role you would like to add?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID of the role you would like to add?",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: response.role,
          salary: response.salary,
          department_id: response.department_id,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Role added.");
          Start();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the employee you would like to add?",
      },
      {
        type: "input",
        name: "manager_id",
        message:
          "What is the manager ID of the employee you would like to add?",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role_id,
          manager_id: response.manager_id,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Employee added.");
          Start();
        }
      );
    });
};

const Initialize = () => {
  console.log("App for tracking employees.");
  console.log("Please make a selection below:");
  Start();
};

Initialize();
