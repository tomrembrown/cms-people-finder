'use strict'

const updateInterestListForMember = async function (
  client,
  id,
  newInterestList
) {
  // There are two queries - first delete any entries from table listing current
  // interets for this member
  const deleteQueryString =
    'DELETE FROM profiles_interests WHERE profile_id=$1;'
  const deleteQueryArray = [id]

  // Next insert the new interest list into table - not since using subquery in
  // insert need an insert statement for each interest
  // Insert statement is same for each - so just have 2D array
  let insertQueryString =
    'INSERT INTO profiles_interests(profile_id, interest_id, display_order) ' +
    'SELECT $1, i.id, $2 ' +
    'FROM interests AS i ' +
    'WHERE i.interest = $3;'

  let insertQueryArray = []

  for (let i = 0; i < newInterestList.length; ++i) {
    insertQueryArray.push([id, i + 1, newInterestList[i]])
  }

  try {
    await client.query(deleteQueryString, deleteQueryArray)
    for (let i = 0; i < newInterestList.length; ++i) {
      await client.query(insertQueryString, insertQueryArray[i])
    }
  } catch (error) {
    console.error(`Error in updateInterestListForMember: ${error.message}`)
    throw new Error(`Error in updateInterestListForMember: ${error.message}`)
  }
}

module.exports = updateInterestListForMember
