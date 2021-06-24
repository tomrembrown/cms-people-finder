const express = require('express')
const signupController = require('../controllers/auth/signupController')
const loginController = require('../controllers/auth/loginController')
const deleteProfileController = require('../controllers/auth/deleteProfileController')

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController) // post instead of get to avoid non-secure sending of password
router.delete('/profile/:id', deleteProfileController)

module.exports = router
