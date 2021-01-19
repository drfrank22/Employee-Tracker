const connection = require("./connection");

class DB {

    constructor(connection) {
        this.connection = connection
    };

    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name"
        );
    };

    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, role.salary, department.name as department LEFT JOIN department on role.department_id = department.id"
        );
    };

    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    };

    createDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        );
    };

    createRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        );
    };

    createEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        );
    };

    updateEmployeeRole(roleId, employeeId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    };
};

module.exports = new DB(connection);