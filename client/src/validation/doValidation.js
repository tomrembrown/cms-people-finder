import { checkHandleTaken } from '@/api/api-client'
import {
  validateEmail,
  validateHandle,
  validatePassword,
} from './commonValidation'

export const INVALID_HANDLE_MESSAGE =
  'Handle must be between 3 and 25 characters long'
export const HANDLE_TAKEN_MESSAGE = 'User Handle already taken'
export const INVALID_EMAIL_MESSAGE = 'Invalid email'
export const INVALID_PASSWORD_MESSAGE =
  'Password is 8 to 20 non-whitespace characters'
export const FIELD_NOT_FOUND_MESSAGE =
  'That field was not found in validation.js file'
export const EMAIL_TAKEN_MESSAGE =
  'Account already exists for email. Please sign in'
export const INVALID_VERIFY_PASSWORD_MESSAGE = 'Passwords do not match'
export const LOGIN_GENERAL_ERROR_MESSAGE = 'Invalid User Credentials'

export const doValidation = async (field, value) => {
  const result = {
    validationOK: false,
    errorMessage: field + ' was not found in doValidation.js',
  }

  switch (field) {
    case 'handle':
      if (validateHandle(value)) {
        const data = await checkHandleTaken(value)
        if (data.handleTaken) {
          result.errorMessage = HANDLE_TAKEN_MESSAGE
        } else {
          result.validationOK = true
          result.errorMessage = null
        }
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
