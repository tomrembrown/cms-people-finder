'use strict'
/*
 * This handles the rest API endpoint: patch /updateprofile. It receives a
 * json object with id, handle, tagline, and description and updates the
 * handle, tagline, and description for that id in the profilestable
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const updateProfile = require('../../model/updateProfile')
const { Client } = require('pg')
const {
  validateId,
  validateHandle,
} = require('../../validation/commonValidation')

const updateProfileController = asyncMiddleware(async (req, res) => {
  const { id, handle, tagline, description } = req.body

  let errorArray = []
  if (!validateHandle(handle)) errorArray.push('invalid handle')
  if (!validateId(id)) errorArray.push('invalid id')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = new Client()
  await client.connect()

  await updateProfile(client, id, handle, tagline, description)
  await client.end()
  return res.json('success')
})

module.exports = updateProfileController
