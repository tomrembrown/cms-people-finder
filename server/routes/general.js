const express = require('express')
const getCompleteInterestListController = require('../controllers/general/getCompleteInterestListController')

const router = express.Router()

router.get('/interests', getCompleteInterestListController)

module.exports = router
