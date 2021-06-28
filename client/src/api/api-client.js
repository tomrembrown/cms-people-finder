const endpoint = process.env.VUE_APP_API_URL + '/'

export const signup = (handle, email, password) => {
  const data = { handle, email, password }
  return fetch(endpoint + 'signup', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const login = (email, password) => {
  const data = { email, password }
  return fetch(endpoint + 'login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const getProfile = (id) => {
  return fetch(endpoint + 'profile/' + id, {
    method: 'GET',
  }).then((response) => response.json())
}

export const checkHandleTaken = (handle) => {
  const queryString = '?handle=' + handle
  const totalURI = endpoint + 'checkHandleTaken/' + encodeURI(queryString)
  return fetch(totalURI, {
    method: 'GET',
  }).then((response) => response.json())
}

export const updateHandle = (id, handle) => {
  const data = { id, handle }
  return fetch(endpoint + 'updateHandle', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const deleteProfile = (id) => {
  return fetch(endpoint + 'profile/' + id, {
    method: 'DELETE',
  }).then((response) => response.json())
}
