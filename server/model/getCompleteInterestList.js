'use strict'

const getCompleteInterestList = async function (client) {
  try {
    const getCompleteInterestListQuery = 'SELECT id, interest FROM interests;'
    const response = await client.query(getCompleteInterestListQuery)
    let data
    if (response.rowCount === 0) data = {}
    else {
      data = {}
      for (let i = 0; i < response.rowCount; ++i) {
        data[response.rows[i].id] = response.rows[i].interest
      }
    }
    return data
  } catch (error) {
    console.error(`Error in getCompleteInterestList ${error.message}`)
    throw new Error(`Error in getCompleteInterestList: ${error.message}`)
  }
}

module.exports = getCompleteInterestList
