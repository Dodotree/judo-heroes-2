import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})


// Fetches users page from API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUsers = login => ({
  login: login,
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: '',   //`users/${login}`,
    schema: Schemas.USER_ARRAY
  }
})


// Fetches users from API unless they don't need an update.
// Relies on Redux Thunk middleware.
// via bundActionCreator
export const loadUsers = (login) => (dispatch, getState) =>{
  //const user = getState().entities.users[login]
  //if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
  //  return null
  //}
console.log('fetching geez', login);
  return dispatch(fetchUsers(login))
}



// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [ POST_REQUEST, POST_SUCCESS, POST_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl))
}


