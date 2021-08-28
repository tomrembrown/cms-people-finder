'use strict'

const updateProfile = async function (client, id, fieldsToChange) {
  let queryString = 'UPDATE profiles SET '
  let queryArray = []

  let index = 1
  for (const key in fieldsToChange) {
    if (index > 1) queryString += ', '
    queryString += key + '=$' + index
    index++
    queryArray.push(fieldsToChange[key])
  }

  queryString += ' WHERE id=$' + index + ';'
  queryArray.push(id)

  try {
    await client.query(queryString, queryArray)
  } catch (error) {
    console.error(`Error in updateProfile: ${error.message}`)
    throw new Error(`Error in updateProfile: ${error.message}`)
  }
}

module.exports = updateProfile
