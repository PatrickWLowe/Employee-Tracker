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
        name: "title",
        message: "What is the job title of the employee you would like to add?",
      },
      {
        type: "input",
        name: "manager_id",
        message:
          "What is the manager ID of the employee you would like to add?",
      },
      {
        type: "input",
        name: "department",
        message:
          "What is the department of the employee you would like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the employee you would like to add?",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          title: response.title,
          manager_id: response.manager_id,
          department: response.department,
          salary: response.salary,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Employee added.");
          Start();
        }
      );
    });
};

const updateEmployee = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "SelectedEmployee",
          message: "Which Employee do you want to update?",
          choices: function () {
            let employeelist = [];
            res.forEach((res) => {
              employeelist.push(res.last_name);
            });
            return employeelist;
          },
        },
      ])
      .then(function (answer) {
        console.log(answer);
        const employeename = answer.SelectedEmployee;
        db.query("SELECT * FROM role", function (err, res) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "SelectedRole",
                message: "What is the new role of the employee?",
                choices: function () {
                  let rolelist = [];
                  res.forEach((res) => {
                    rolelist.push(res.title);
                  });
                  return rolelist;
                },
              },
            ])
            .then(function (roleAnswer) {
              const rolechange = roleAnswer.SelectedRole;
              console.log(rolechange);
              db.query(
                "SELECT * FROM role WHERE title = ?",
                [rolechange],
                function (err, res) {
                  if (err) throw err;
                  let role_title = res[0].title;
                  let query =
                    "UPDATE employee SET title = ? WHERE last_name = ?";
                  let values = [role_title, employeename];
                  console.log(values);
                  db.query(query, values, function (err, res, fields) {
                    console.log(
                      `Updated ${employeename}'s role to ${rolechange}.`
                    );
                    Start();
                  });
                }
              );
            });
        });
      });
  });
};

const Initialize = () => {
  console.log("App for tracking employees.");
  console.log("Please make a selection below:");
  Start();
};

Initialize();
