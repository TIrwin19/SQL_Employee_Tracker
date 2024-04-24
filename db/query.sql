SELECT * 
FROM employees 
LEFT JOIN roles 
ON employees.title = roles.title;

SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;

SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
FROM roles 
JOIN departments 
ON roles.department_id = departments.id;

SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS full_name, roles.title, departments.name AS department_name, roles.salary 
FROM employees 
JOIN roles ON employees.role_id = roles.id 
JOIN departments ON roles.department_id = departments.id;