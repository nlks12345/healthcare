const express = require('express')
const router = express.Router()

const apptController = require('../controller/appts.controller')

router.get('/list',apptController.getAll)
router.get('/list/:id',apptController.getById)
router.post('/create',apptController.create)
router.post('/reschedule/',apptController.reschedule)
router.post('/arrive/',apptController.arrive)

module.exports = router