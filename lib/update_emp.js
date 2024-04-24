// const { selectEmpQuestion, updateRoleInput } = require('./main_qs')
const { roleList } = require('./main_questions')
const inquirer = require('inquirer')

async function updateEmployeeRole(client) {
  const empList = await employeesList(client)
  const empListAns = await selectEmpQuestion(empList)
  const titleList = await roleList(client)
  const newRole = await updateRoleInput(titleList)
  await updateEmployee(newRole, empListAns, client)
}

async function employeesList(client) {
  const empNames = await client.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees`)
  const empList = empNames.rows.map(row => ({
    name: row.full_name,
    value: row.id
  }))
  return empList
}

function selectEmpQuestion(empList) {
  const selectEmpQ = [{
    name: 'selectEmp',
    type: 'list',
    message: 'Choose an employee to update.',
    choices: empList
  }]
  return inquirer.prompt(selectEmpQ)
}

function updateRoleInput(roleList) {
  const updatedRole = [{
    name: 'updateRole',
    type: 'list',
    message: 'Choose new role',
    choices: roleList
  }]
  return inquirer.prompt(updatedRole)
}

async function updateEmployee(role, name, client) {

  const update = {
    text: 'UPDATE employees SET role_id = $1 WHERE id = $2',
    values: [role.updateRole, name.selectEmp]
  }
  try{
    await client.query(update)
    console.log('Role changed successfully')
  } catch (error){
    console.error('Error updating emplouees role:', error)
  }
}

module.exports = updateEmployeeRole