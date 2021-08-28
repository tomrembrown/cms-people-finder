'use strict'
/*
 * Pads a string with zeroes
 */

const pad = function (number, length) {
  let str = '' + number
  while (str.length < length) {
    str = '0' + str
  }

  return str
}

module.exports = pad
