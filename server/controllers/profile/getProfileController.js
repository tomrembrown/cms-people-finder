'use strict'
/*
 * This handle the rest API endpoint: get /profile/:id
 * It receives as the express parameter the id of the profile - and then
 * returns only the 'safe' items of the profile contained in the profiles
 * table. It returns a json object containing id, handle
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const getProfile = require('../../model/getProfile')
const poolConnect = require('../../model/poolConnect')
const { validateId } = require('../../validation/commonValidation')

const getProfileController = asyncMiddleware(async (req, res) => {
  const { id } = req.params

  if (!validateId(id)) return res.json('invalid id')

  const client = await poolConnect()
  try {
    const data = await getProfile(client, id)
    if (data.length === 0) return res.json('Profile not found')
    else return res.json(data)
  } catch (error) {
    console.error(`Error in getProfileController: ${error.message}`)
    throw new Error(`Error in getProfileController: ${error.message}`)
  } finally {
    client.release()
  }
})

module.exports = getProfileController
