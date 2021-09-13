'use strict'

const getInterestList = async function (client, id) {
  try {
    const getInterestListQuery =
      'SELECT   i.interest AS interest ' +
      'FROM profiles_interests AS j ' +
      'INNER JOIN interests AS i ON (i.id = j.interest_id) ' +
      'WHERE j.profile_id=$1 ' +
      'ORDER BY j.display_order;'
    const response = await client.query(getInterestListQuery, [id])
    let data
    if (response.rowCount === 0) data = []
    else {
      data = []
      for (let i = 0; i < response.rowCount; ++i) {
        data.push(response.rows[i].interest)
      }
    }
    return data
  } catch (error) {
    console.error(`Error in getInterestList: ${error.message}`)
    throw new Error(`Error in getInterestList: ${error.message}`)
  }
}

module.exports = getInterestList
