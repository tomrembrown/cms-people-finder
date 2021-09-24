'use strict'

const getInterestListForMember = async function (client, id) {
  try {
    const getInterestListForMemberQuery =
      'SELECT    i.interest AS interest ' +
      'FROM profiles_interests AS j ' +
      'INNER JOIN interests AS i ON (i.id = j.interest_id) ' +
      'WHERE j.profile_id=$1 ' +
      'ORDER BY j.display_order;'
    const response = await client.query(getInterestListForMemberQuery, [id])
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
    console.error(`Error in getInterestListForMember: ${error.message}`)
    throw new Error(`Error in getInterestListForMember: ${error.message}`)
  }
}

module.exports = getInterestListForMember
