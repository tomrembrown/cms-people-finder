'use strict'
/*
 * This converts an image stored as a URL string into a file and saves
 * it in the correct place on the server. Then it replaces the URL
 * string in the fieldsToChange with the path to that image
 */

const base64Img = require('base64-img')
const util = require('util')
const pad = require('./pad')

const imageURLStart = '/data/profilePics'

// Use node's promisfy method to convert method with callback to promise
const base64ToFilePromise = util.promisify(base64Img.img)

const processImage = async function (id, fieldsToChange) {
  try {
    const folderPath = appRoot + imageURLStart

    // Filename is the user id (the base64ToFile method will add extension)
    const filename = 'user' + pad(id, 6)

    const filePath = await base64ToFilePromise(
      fieldsToChange.image_link,
      folderPath,
      filename
    )

    // Replace what is saved in database with just link to image when loaded in browser
    fieldsToChange.image_link = filePath
  } catch (error) {
    console.log(`Error in utils/processImage: ${error.message}`)
    throw new Error(`Error in utils/processImage: ${error.message}`)
  }

  return fieldsToChange
}

module.exports = processImage
