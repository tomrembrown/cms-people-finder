'use strict'

const updateInterestListForMember = require('./updateInterestListForMember')

const updateProfile = async function (client, id, fieldsToChange) {
  let queryString = 'UPDATE profiles SET '
  let queryArray = []

  try {
    await client.query('BEGIN TRANSACTION;')

    let index = 1
    for (const key in fieldsToChange) {
      // Interests, skills and projects are handled differently - so
      // handle these in different subroutines
      if (key === 'interests')
        updateInterestListForMember(client, id, fieldsToChange[key])
      else {
        if (index > 1) queryString += ', '
        queryString += key + '=$' + index
        index++
        queryArray.push(fieldsToChange[key])
      }
    }

    queryString += ' WHERE id=$' + index + ';'
    queryArray.push(id)

    if (index > 1) await client.query(queryString, queryArray)
    await client.query('COMMIT TRANSACTION;')
  } catch (error) {
    console.error(`Error in updateProfile: ${error.message}`)
    throw new Error(`Error in updateProfile: ${error.message}`)
  }
}

module.exports = updateProfile
