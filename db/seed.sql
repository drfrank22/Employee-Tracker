USE employeeDb;

INSERT INTO department
    (id, name)
VALUES
    (1, 'Executive'),
    (2, 'Sales'),
    (3, 'Development'),
    (4, 'Human Resources'),
    (5, 'Customer Service');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('CEO', 350000, 1),
    ('CFO', 325000, 1),
    ('Sales Lead', 150000, 2),
    ('Salesperson', 90000, 2),
    ('Lead Engineer', 150000, 3),
    ('Software Engineer', 120000, 3),
    ('Lawyer', 175000, 4),
    ('HR Director', 125000, 4),
    ('Customer Service Director', 125000, 5),
    ('Customer Service Manager', 80000, 5),
    ('Customer Service Rep.', 55000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Dylan', 'Frank', 1, NULL),
    ('Sarah', 'Vaughan', 2, NULL),
    ('Ashley', 'Jones', 3, 1),
    ('Ashley', 'Penny', 4, 3),
    ('Jake', 'Jerry', 5, 1),
    ('Jon', 'Smith', 6, 5),
    ('Tom', 'Landry', 7, 1),
    ('Andy', 'Reid', 8, 1),
    ('Brian', 'Dawkins', 9, 1),
    ('Peyton', 'Manning', 10, 9),
    ('Tom', 'Brady', 11, 10);