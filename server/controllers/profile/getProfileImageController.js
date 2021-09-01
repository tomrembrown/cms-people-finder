'use strict'
/*
 * This handle the rest API endpoint: get /profile/:id
 * It receives as the express parameter the id of the profile - and then
 * returns only the 'safe' items of the profile contained in the profiles
 * table. It returns a json object containing id, handle
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const path = require('path')

const getProfileImageController = asyncMiddleware(async (req, res) => {
  const { image_filename } = req.query

  res.sendFile(path.join(appRoot, 'data', 'profilePics', image_filename))
})

module.exports = getProfileImageController
