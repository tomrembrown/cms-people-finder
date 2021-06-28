'use strict'

const checkHandleTaken = async function (client, handle) {
  try {
    const response = await client.query(
      'SELECT id FROM profiles WHERE handle=$1;',
      [handle]
    )
    return !(response.rowCount === 0)
  } catch (error) {
    console.error(`Error in checkHandleTaken: ${error.message}`)
    throw new Error(`Error in checkHandleTaken: ${error.message}`)
  }
}

module.exports = checkHandleTaken
