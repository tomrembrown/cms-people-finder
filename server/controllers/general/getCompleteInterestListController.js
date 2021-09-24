'use strict'
/*
 * This handle the rest API endpoint: get /interests
 * This returns a complete list of interests from the database in an
 * associative array with the key being the id in the database table and the
 * value being the interest
 */

const asyncMiddleware = require('../../utils/asyncMiddleware')
const getCompleteInterestList = require('../../model/getCompleteInterestList')
const poolConnect = require('../../model/poolConnect')

const getCompleteInterestListController = asyncMiddleware(async (req, res) => {
  const client = await poolConnect()

  try {
    const data = await getCompleteInterestList(client)
    if (data.length === 0) return res.json('No interests found')
    else return res.json(data)
  } catch (error) {
    console.error(
      `Error in  getCompleteInterestListController: ${error.message}`
    )
    throw new Error(
      `Error in  getCompleteInterestListController: ${error.message}`
    )
  } finally {
    client.release()
  }
})

module.exports = getCompleteInterestListController
