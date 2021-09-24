'use strict'
/*
 * This handles the rest API endpoint patch - checkhandletaken, which receives
 * a json object in the body of { "handle": "bob" } - where bob is a demo user
 * handle, and calls the model to check in the database if the handle is taken.
 * It then returns a json object of { "handleTaken": boolean } where the boolean
 * is either true or false depending on whether or not this handle is taken. This
 * is intended to be used in the client to rapidly indicate to a user if a handle
 * they want to use (which are displayed in the high score list on the game) is
 * taken or not - before submitting the request to create or update the account on
 * the server
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const checkHandleTaken = require('../../model/checkHandleTaken')
const poolConnect = require('../../model/poolConnect')
const { validateHandle } = require('../../validation/commonValidation')

const checkHandleTakenController = asyncMiddleware(async (req, res) => {
  const { handle } = req.query

  if (!validateHandle(handle)) return res.json('invalid handle')

  const client = await poolConnect()
  try {
    const handleTaken = await checkHandleTaken(client, handle)
    res.json({ handleTaken })
  } catch (error) {
    console.error(`Error in checkHandleTakenController: ${error.message}`)
    throw new Error(`Error in checkHandleTakenController: ${error.message}`)
  } finally {
    client.release()
  }
})

module.exports = checkHandleTakenController
