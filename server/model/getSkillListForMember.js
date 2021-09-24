'use strict'

const getSkillListForMember = async function (client, id) {
  try {
    const getSkillListForMemberQuery =
      'SELECT   s.skill AS skill ' +
      'FROM profiles_skills AS j ' +
      'INNER JOIN skills AS s ON (s.id = j.skill_id) ' +
      'WHERE j.profile_id=$1 ' +
      'ORDER BY j.display_order;'
    const response = await client.query(getSkillListForMemberQuery, [id])
    let data
    if (response.rowCount === 0) data = []
    else {
      data = []
      for (let i = 0; i < response.rowCount; ++i) {
        data.push(response.rows[i].skill)
      }
    }
    return data
  } catch (error) {
    console.error(`Error in getSkillForMemberList: ${error.message}`)
    throw new Error(`Error in getSkillForMemberList: ${error.message}`)
  }
}

module.exports = getSkillListForMember
