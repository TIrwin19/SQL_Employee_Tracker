// const { empQuestions } = require('./main_qs')
const { roleList } = require('./main_questions')
const inquirer = require('inquirer')

async function addAnEmployee(client) {
  const roleChoice = await roleList(client)
  const managerChoice = await managerList(client)
  const empAns = await empQuestions(roleChoice, managerChoice)
  await addEmployee(empAns, client)
}

async function managerList(client) {
  const managerNames = await client.query(`SELECT manager.id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employees AS manager WHERE manager_id IS NULL`)
  const managerList = managerNames.rows.map(row => ({
    name: row.manager_name,
    value: row.id
  }))
  return managerList
}

function empQuestions(roleChoice, managerChoice) {
  const empQ = [{
    name: 'empFirstName',
    message: 'Enter the employees first name.',
  },
  {
    name: 'empLastName',
    message: 'Enter the employees last name.',
  },
  {
    name: 'empRole',
    type: 'list',
    message: 'Select the employees role.',
    choices: roleChoice
  },
  {
    name: 'empManager',
    type: 'list',
    message: 'Select the employees manager.',
    choices: managerChoice
  },
]
  return inquirer.prompt(empQ)
}

async function addEmployee (ans, client) {
  const insert = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)'
  const values = [ans.empFirstName, ans.empLastName, ans.empRole, ans.empManager]

  try{
    await client.query(insert, values)
    console.log('Employee added successfully')
  } catch (error) {
    console.error('Error adding an employee:', error)
  }
}

module.exports = addAnEmployee