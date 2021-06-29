'use strict'

const signup = async function (
  client,
  email,
  password_hash,
  signup_date,
  handle
) {
  try {
    await client.query('BEGIN TRANSACTION;')

    const response = await client.query(
      'INSERT INTO login (email, password_hash, signup_date) ' +
        'VALUES ($1, $2, $3) ' +
        'RETURNING id;',
      [email, password_hash, signup_date]
    )
    const id = parseInt(response.rows[0].id)

    // Get remaining fields from default user - initial default
    const defaultFieldsResponse = await client.query(
      'SELECT tagline, description FROM profiles WHERE id=0;'
    )

    const tagline = defaultFieldsResponse.rows[0].tagline
    const description = defaultFieldsResponse.rows[0].description

    await client.query(
      'INSERT INTO profiles (id, handle, tagline, description) VALUES ($1, $2, $3, $4);',
      [id, handle, tagline, description]
    )

    await client.query('COMMIT TRANSACTION;')
    const data = {
      id: id,
      handle: handle,
      tagline: tagline,
      description: description,
    }
    return data
  } catch (error) {
    console.error(`Error in signup: ${error.message}`)
    throw new Error(`Error in signup: ${error.message}`)
  }
}

module.exports = signup
