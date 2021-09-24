'use strict'

const getProjectListForMember = async function (client, id) {
  try {
    const getProjectListForMemberQuery =
      'SELECT   p.title AS title, p.description AS description, u.type AS user_type ' +
      'FROM profiles_projects AS j ' +
      'INNER JOIN projects AS p ON (p.id = j.project_id) ' +
      'INNER JOIN user_types as u ON (u.id = j.user_type) ' +
      'WHERE j.profile_id=$1 ' +
      'ORDER BY j.display_order;'
    const response = await client.query(getProjectListForMemberQuery, [id])
    let data
    if (response.rowCount === 0) data = []
    else {
      data = response.rows
    }
    return data
  } catch (error) {
    console.error(`Error in getProjectListForMember: ${error.message}`)
    throw new Error(`Error in getProjectListForMember: ${error.message}`)
  }
}

module.exports = getProjectListForMember
