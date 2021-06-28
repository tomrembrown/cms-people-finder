'use strict'

const updateHandle = async function (client, id, handle) {
  try {
    await client.query('UPDATE profiles SET handle=$1 WHERE id=$2', [
      handle,
      id,
    ])
  } catch (error) {
    console.error(`Error in updateHandle: ${error.message}`)
    throw new Error(`Error in updateHandle: ${error.message}`)
  }
}

module.exports = updateHandle
