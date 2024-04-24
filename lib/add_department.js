// const {DepQuestion} = require('./main_qs')
// const {addDepartment} = require('./queries')
const inquirer = require('inquirer')

async function addADepartment(client) {
  const depAns = await DepQuestion()
  await addDepartment(depAns, client)
}

function DepQuestion() {
  const depQ = [{
    name: 'addDept',
    message: 'Enter the name of the department you want to add.',
  }]
  return inquirer.prompt(depQ)
}

async function addDepartment (ans, client) {
  const insert = 'INSERT INTO departments (name) VALUES ($1)'
  const values =  [ans.addDept]

  try{
    await client.query(insert, values)
    console.log('Depratment added successfully!')
  } catch (error) {
    console.error('Error adding Department:', error)
  }
}

module.exports = addADepartment