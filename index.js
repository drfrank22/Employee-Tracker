const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/index");
require("console.table");

// runs main function
init();

function init() {
    // shows logo and starts prompts for user
    const logoDisplay = logo({ name: "Employee Tracker"}).render();

    console.log(logoDisplay);

    loadPrompts();
};

async function loadPrompts() {
    const { choice } = await prompt ([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "View_Departments"
                },
                {
                    name: "View All Roles",
                    value: "View_Roles"
                },
                {
                    name: "View All Employees",
                    value: "View_Employees"
                },
                {
                    name: "Add Department",
                    value: "Add_Department"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "Update Employee's Role",
                    value: "Update_Role"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }
            ]
        }
    ]);

    switch (choice) {
        case "View_Departments":
            return viewAllDepartments();
        case "View_Roles":
            return viewAllRoles();
        case "View_Employees":
            return viewAllEmployees();
        case "Add_Department":
            return addDepartment();
        case "Add_Role":
            return addRole();
        case "Add_Employee":
            return addEmployee();
        case "Update_Role":
            return updateEmployeeRole();
        default:
            return quit(); 
    };
};

async function viewAllDepartments() {

    const departments = await db.findAllDepartments();

    console.log("\n");

    console.table(departments);

    loadPrompts();
};

async function viewAllRoles() {

    const roles = await db.findAllRoles();

    console.log("\n");

    console.table(roles);

    loadPrompts();
};

async function viewAllEmployees() {

    const employees = await db.findAllEmployees();

    console.log("\n");

    console.table(employees);

    loadPrompts();
};

async function addDepartment() {

    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the new department?"
        }
    ]);

    await db.createDepartment(department);

    console.log(`Successfully added ${department.name} to the database!`);

    loadPrompts();
};

async function addRole() {

    const departments = await db.findAllDepartments();

    const departmentOptions = departments.map(({ name, id }) => ({
        name: name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "What is the salary for the new role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belond to?",
            choices: departmentOptions
        }
    ]);

    await db.createRole(role);

    console.log(`Successfully added ${role.title} to the database!`);

    loadPrompts();
};

async function addEmployee() {

    const roles = await db.findAllRoles();

    const employees = await db.findAllEmployees();

    const roleOptions = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const managerOptions = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: `What is ${employee.first_name} ${employee.last_name}'s role?`,
        choices: roleOptions
    });

    employee.role_id = roleId;

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: `Who is ${employee.first_name} ${employee.last_name}'s manager?`,
        choices: managerOptions
    });
    
    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(`Successfully added ${employee.first_name} ${employee.last_name} to the database!`)

    loadPrompts();
};

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const roles = await db.findAllRoles();

    const roleOptions = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role would you like to update?",
            choices: employeeOptions
        }
    ]);

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which new role would you like to assign?",
            choices: roleOptions
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Successfully updated the employee's role!");

    loadMainPrompts();
};

function quit() {

    console.log("Until next time!");

    process.exit();
};