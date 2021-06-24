const validateId = (id) => {
  // Note that eslint would flag '==' as warning - it is wanted in this case though
  // The implicit type casting of == is used to check if id is really an integer
  // eslint-disable-next-line
  return id == parseInt(id, 10) && id > 0
}

const validateUserHandle = (user_handle) => {
  return user_handle.length >= 3 && user_handle.length <= 25
}

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePassword = (password) => {
  return /^[^\s]{8,20}$/.test(password)
}

module.exports = {
  validateId,
  validateUserHandle,
  validateEmail,
  validatePassword,
}
