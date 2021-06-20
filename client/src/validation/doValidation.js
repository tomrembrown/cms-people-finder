import {
  validateEmail,
  validatePassword,
  validateUserHandle,
} from './commonValidation'

const INVALID_HANDLE_MESSAGE = 'Handle must be between 3 and 25 characters long'
// const HANDLE_TAKEN_MESSAGE = 'User Handle already taken'
const INVALID_EMAIL_MESSAGE = 'Invalid email'
const INVALID_PASSWORD_MESSAGE = 'Password is 8 to 20 non-whitespace characters'
const FIELD_NOT_FOUND_MESSAGE = 'That field was not found in validation.js file'

const doValidation = (field, value) => {
  const result = {
    validationOK: false,
    errorMessage: FIELD_NOT_FOUND_MESSAGE,
  }

  switch (field) {
    case 'handle':
      if (validateUserHandle(value)) {
        // checkHandleTaken(value).then((data) => {
        //   if (data.handleTaken) {
        //     result.errorMessage = HANDLE_TAKEN_MESSAGE
        //   } else {
        result.validationOK = true
        result.errorMessage = null
        // }
        // })
      } else {
        result.errorMessage = INVALID_HANDLE_MESSAGE
      }
      break
    case 'email':
      if (validateEmail(value)) {
        result.validationOK = true
        result.errorMessage = null
      } else {
        result.errorMessage = INVALID_EMAIL_MESSAGE
      }
      break
    case 'password':
      if (validatePassword(value)) {
        result.validationOK = true
        result.errorMessage = null
      } else {
        result.errorMessage = INVALID_PASSWORD_MESSAGE
      } // Handle verify password & password not match in signup module
      break
    case 'verify_password':
      // Handle verify password & password not match in signup module
      result.validationOK = true
      result.errorMessage = null
      break
  }
  return result
}

export default doValidation
