USE employee_manager; 

INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Seth", "Rogan", "Salesperson", "Sales", 90000, 1);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Paul", "Rudd", "Sales Lead", "Sales", 120000, 1);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("James", "Franco", "Lead Engineer", "Engineering", 160000, 2);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Samwise", "Gamgee", "Software Engineer", "Engineering", 130000, 2);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Meriadoc", "Brandybuck", "Accountant", "Finance", 120000, 3);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Arwen", "Evenstar", "Lawyer", "Finance", 200000, 3);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Frodo", "Baggins", "Marketer", "Marketing", 200000, 4);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Gandalf", "Grey", "Marketer", "Marketing", 200000, 4);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Tom", "Bombadil", "HR Lead", "Human Resources", 100000, 5);
INSERT INTO employee(first_name, last_name, title, department, salary, manager_id) VALUES ("Saruman", "White", "HR Representative", "Human Resources", 75000, 5);

INSERT INTO department(name) VALUES ("Sales");
INSERT INTO department(name) VALUES ("Engineering");
INSERT INTO department(name) VALUES ("Finance");
INSERT INTO department(name) VALUES ("Marketing");
INSERT INTO department(name) VALUES ("Human Resources");

INSERT INTO role(title, salary, department_id) VALUES ("Sales Lead", 120000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Salesperson", 90000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Lead Engineer", 160000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Software Engineer", 130000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Accountant", 120000, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Marketer", 200000, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Lawyer", 200000, 4);
INSERT INTO role(title, salary, department_id) VALUES ("HR Lead", 100000, 5);
INSERT INTO role(title, salary, department_id) VALUES ("HR Representative", 75000, 5);

