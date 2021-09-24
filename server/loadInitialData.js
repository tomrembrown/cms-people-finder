'use strict'

const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '/.env') })

const { Client } = require('pg')

const client = new Client()

const interestsFile = path.join(
  __dirname,
  'data',
  'initial',
  'ListOfInterests.csv'
)

fs.readFile(interestsFile, 'utf8', (err, data) => {
  if (err) console.error(err)

  const interestArray = data.split(/\r?\n|\r/)
  let interestCleaned = interestArray[0].replace("'", "''").trim()
  let interestList = "('" + interestCleaned + "')"
  for (let i = 1; i < interestArray.length; ++i) {
    interestCleaned = interestArray[i].replace("'", "''").trim()
    if (interestCleaned.length > 3)
      interestList += ", ('" + interestCleaned + "')"
  }

  const sqlQuery = `INSERT INTO interests(interest) VALUES ${interestList};`

  client.connect()
  client
    .query(sqlQuery)
    .then((r) => console.log('Loaded interetsts successfully!'))
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
})
