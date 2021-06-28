'use strict'
/*
 * This handles the rest API endpoint: patch /updatehandle. It receives a
 * json object with id and handle and updates the handle for that
 * id in the profilestable
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const updateHandle = require('../../model/updateHandle')
const { Client } = require('pg')
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

  const client = new Client()
  await client.connect()

  await updateHandle(client, id, handle)
  await client.end()
  return res.json('success')
})

module.exports = updateHandleController
