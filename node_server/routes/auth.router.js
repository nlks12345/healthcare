const express = require('express')
const router = express.Router()

const authController = require('../controller/auth.controller')

router.post('/register', authController.register)
router.post('/login', authController.login)
// router.get('/list',apptController.getAll)
// router.get('/list/:id',apptController.getById)
// router.post('/create',apptController.create)
// router.post('/reschedule/:id/',apptController.reschedule)
// router.post('/arrive/:id/',apptController.reschedule)

module.exports = router