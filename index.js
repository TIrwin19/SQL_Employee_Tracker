require('console.table')

const {mainQuestions ,displayTable} = require('./lib/main_questions')
const addADepartment = require('./lib/add_department')
const addARole = require('./lib/add_role')
const addAnEmployee = require('./lib/add_emp')
const updateEmployeeRole = require('./lib/update_emp')

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'pass',
  port: 5432
})

async function init() {
  try {
    await client.connect()
    console.log('Connected')
    let ans
    do {
      ans = await mainQuestions()

      switch (ans.main) {
        case 'View all departments':
        case 'View all roles':
        case 'View all employees':
          await displayTable(ans, client)
          break

        case 'Add a department':
          await addADepartment(client)
          break

        case 'Add a role':
          await addARole(client)
          break

        case 'Add an employee':
          await addAnEmployee(client)
          break

        case 'Update an employee role':
          await updateEmployeeRole(client)
          break

        case 'Exit':
          process.exit()
          break

        default:
          console.log('Invalid choice')
      }

    } while (ans.main !== 'Exit')

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.end()
    console.log('Disconnected')
  }
}

init()