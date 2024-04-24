// const{roleQuestions} = require('./main_qs')
// const{departmentList, addRole} = require('./queries')
const inquirer = require('inquirer')

async function addARole(client) {
  const depChoice = await departmentList(client)
  const roleAns = await roleQuestions(depChoice)
  await addRole(roleAns, client)
}

async function departmentList(client) {
  const depNames = await client.query("SELECT id, name FROM departments")
  const depList = depNames.rows.map(row => ({
    name: row.name,
    value: row.id
  }))
  return depList
}

function roleQuestions(depList) {
  const roleQ = [{
    name: 'addRole',
    message: 'Enter the name of a role you want to add.',
  },
  {
    name: 'roleDepartment',
    type: 'list',
    message: 'Select a department this role will be added to.',
    choices: depList,
  },
  {
    name: 'roleSalary',
    message: 'Enter a salary for that role.',
    validate: (input) => {
      if (isNaN(input)) {
        return 'Please enter a number:'
      }
      return true
    },
  }]
  return inquirer.prompt(roleQ)
}

async function addRole (ans, client) {
  const insert = 'INSERT INTO roles (title, department_id, salary) VALUES ($1, $2, $3)'
  const values = [ans.addRole, ans.roleDepartment, ans.roleSalary]

  try{
    await client.query(insert, values)
    console.log('Role added successfully!')
  } catch (error) {
    console.error('Error adding a Role:', error)
  }
}

module.exports = addARole