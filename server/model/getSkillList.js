'use strict'

const getSkillList = async function (client, id) {
  try {
    const getSkillListQuery =
      'SELECT   s.skill AS skill ' +
      'FROM profiles_skills AS j ' +
      'INNER JOIN skills AS s ON (s.id = j.skill_id) ' +
      'WHERE j.profile_id=$1 ' +
      'ORDER BY j.display_order;'
    const response = await client.query(getSkillListQuery, [id])
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
    console.error(`Error in getSkillList: ${error.message}`)
    throw new Error(`Error in getSkillList: ${error.message}`)
  }
}

module.exports = getSkillList
