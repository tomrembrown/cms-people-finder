'use strict'
/*
 * This handle the rest API endpoint: post /signup. This signs up
 * users. It receives a json object containing email, password,
 * and handle. It creates this user in both database tables, and then
 * returns the contents of the profiles table: id, handle
 */

const bcrypt = require('bcrypt')
const saltRounds = 10
const asyncMiddleware = require('../../utils/asyncMiddleware')
const signup = require('../../model/signup')
const poolConnect = require('../../model/poolConnect')
const {
  validateHandle,
  validateEmail,
  validatePassword,
} = require('../../validation/commonValidation')
const checkEmailTaken = require('../../model/checkEmailTaken')
const checkHandleTaken = require('../../model/checkHandleTaken')

const signupController = asyncMiddleware(async (req, res) => {
  const { handle, email, password } = req.body

  let errorArray = []
  if (!validateHandle(handle)) errorArray.push('invalid handle')
  if (!validateEmail(email)) errorArray.push('invalid email')
  if (!validatePassword(password)) errorArray.push('invalid password')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = await poolConnect()

  try {
    const [emailTaken, handleTaken] = await Promise.all([
      checkEmailTaken(client, email),
      checkHandleTaken(client, handle),
    ])

    if (emailTaken) errorArray.push('email taken')
    if (handleTaken) errorArray.push('handle taken')

    if (errorArray.length > 0) {
      const errorString = errorArray.join()
      return res.json(errorString)
    }

    const signup_date = new Date()
    const password_hash = await bcrypt.hash(password, saltRounds)

    const data = await signup(client, email, password_hash, signup_date, handle)
    return res.json(data)
  } catch (error) {
    console.error(`Error in  signupController: ${error.message}`)
    throw new Error(`Error in  signupController: ${error.message}`)
  } finally {
    client.release()
  }
})

module.exports = signupController
