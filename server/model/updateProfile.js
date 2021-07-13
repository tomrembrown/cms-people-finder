'use strict'

const updateProfile = async function (
  client,
  id,
  handle,
  tagline,
  description
) {
  try {
    await client.query(
      'UPDATE profiles ' +
        'SET handle=$1, tagline=$2, description=$3 ' +
        'WHERE id=$4',
      [handle, tagline, description, id]
    )
  } catch (error) {
    console.error(`Error in updateProfile: ${error.message}`)
    throw new Error(`Error in updateProfile: ${error.message}`)
  }
}

module.exports = updateProfile
