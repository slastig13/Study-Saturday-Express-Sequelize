const router = require('express').Router()
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.send(students)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id

    let student = await Student.findOne({
      where: {
        id: id
      }
    })
    if (student) res.send(student)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })

    res.status(201).send(newStudent)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let studentToUpdate = await Student.findOne({
      where: {
        id: req.params.id
      }
    })
    studentToUpdate = await studentToUpdate.update({
      firstName: req.body.firstName
    })
    res.send(studentToUpdate)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let student = await Student.findOne({
      where: {
        id: req.params.id
      }
    })

    await student.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
