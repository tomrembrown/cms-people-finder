'use strict'

const getInterestListForMember = require('./getInterestListForMember')
const getSkillListForMember = require('./getSkillListForMember')
const getProjectListForMember = require('./getProjectListForMember')

const getProfile = async function (client, id) {
  try {
    const getProfileQuery =
      'SELECT   id, handle, tagline, description, image_filename, aboutme, location ' +
      'FROM profiles ' +
      'WHERE id=$1;'
    const response = await client.query(getProfileQuery, [id])
    let data
    if (response.rowCount === 0) data = []
    else {
      data = response.rows[0]

      // Add info from other tables to this data
      data.interests = await getInterestListForMember(client, id)
      data.skills = await getSkillListForMember(client, id)
      data.projects = await getProjectListForMember(client, id)
    }
    return data
  } catch (error) {
    console.error(`Error in getProfile: ${error.message}`)
    throw new Error(`Error in getProfile: ${error.message}`)
  }
}

module.exports = getProfile
