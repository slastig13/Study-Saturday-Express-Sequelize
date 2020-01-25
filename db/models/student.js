'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Student.beforeCreate(student => {
  let firstName =
    student.firstName[0].toUpperCase() + student.firstName.slice(1)

  let lastName = student.lastName[0].toUpperCase() + student.lastName.slice(1)

  student.firstName = firstName
  student.lastName = lastName
})

module.exports = Student
