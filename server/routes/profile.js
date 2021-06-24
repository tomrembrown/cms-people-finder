const express = require('express')
const getProfileController = require('../controllers/profile/getProfileController')
const checkHandleTakenController = require('../controllers/profile/checkHandleTakenController')
const updateHandleController = require('../controllers/profile/updateHandleController')

const router = express.Router()

router.get('/profile/:id', getProfileController)
router.get('/checkHandleTaken', checkHandleTakenController)
router.patch('/updateHandle', updateHandleController)

module.exports = router
