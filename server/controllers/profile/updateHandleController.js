'use strict'
/*
 * This handles the rest API endpoint: patch /updatehandle. It receives a
 * json object with id and handle and updates the handle for that
 * id in the profilestable
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const updateHandle = require('../../model/updateHandle')
const poolConnect = require('../../model/poolConnect')
const {
  validateId,
  validateHandle,
} = require('../../validation/commonValidation')

const updateHandleController = asyncMiddleware(async (req, res) => {
  const { id, handle } = req.body

  let errorArray = []
  if (!validateHandle(handle)) errorArray.push('invalid handle')
  if (!validateId(id)) errorArray.push('invalid id')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = await poolConnect()

  try {
    await updateHandle(client, id, handle)
    return res.json('success')
  } catch (error) {
    console.error(`Error in updateHandleController: ${error.message}`)
    throw new Error(`Error in updateHandleController: ${error.message}`)
  } finally {
    client.release()
  }
})

module.exports = updateHandleController
