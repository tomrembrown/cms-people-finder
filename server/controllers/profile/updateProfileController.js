'use strict'
/*
 * This handles the rest API endpoint: patch /updateprofile. It receives a
 * json object with id, handle, tagline, and description and updates the
 * handle, tagline, and description for that id in the profilestable
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const updateProfile = require('../../model/updateProfile')
const processImage = require('../../utils/processImage')
const poolConnect = require('../../model/poolConnect')
const {
  validateId,
  validateHandle,
} = require('../../validation/commonValidation')

const updateProfileController = asyncMiddleware(async (req, res) => {
  let { id, fieldsToChange } = req.body

  // Check if input alright
  let errorArray = []
  if (!validateId(id)) errorArray.push('invalid id')

  if (fieldsToChange.handle && !validateHandle(fieldsToChange.handle))
    errorArray.push('invalid handle')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  // If there is an image being sent - then convert image to file, save it,
  // and change the value in the form data to the location of the image
  if ('image_filename' in fieldsToChange) {
    fieldsToChange = await processImage(id, fieldsToChange)
  }

  const client = await poolConnect()

  try {
    await updateProfile(client, id, fieldsToChange)
    return res.json('success')
  } catch (error) {
    console.error(`Error in updateProfileController: ${error.message}`)
    throw new Error(`Error in updateProfileController ${error.message}`)
  } finally {
    client.release()
  }
})

module.exports = updateProfileController
