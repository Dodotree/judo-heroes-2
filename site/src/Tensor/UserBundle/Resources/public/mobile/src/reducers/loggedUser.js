const authenticate = ({ types, mapActionToKey }) => {
  console.log('Logged user enter point')

  if (!Array.isArray(types) || types.length !== 9) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType,
    requestType2, successType2, failureType2,
    requestType3, successType3, failureType3 ] = types

  const updateLoggedUser = (state = {
    isFetching: false,
    loggedIn: false,
    id: null
  }, action) => {
    console.log('Authenticate update ', state, action.type)

    switch (action.type) {
      case 'REGISTRATION_REQUEST':
      case 'LOGIN_REQUEST':
      case 'LOGOUT_REQUEST':
        return {
          ...state,
          isFetching: true
        }
      case 'REGISTRATION_SUCCESS':
      case 'LOGIN_SUCCESS':
      case 'LOGOUT_FAILURE':
        console.log('Authentication success, logout failure', action.response.result, {...state, id: action.response.result})
        return {
          ...state,
          isFetching: false,
          loggedIn: true,
          id: action.response.result
        }
      case 'REGISTRATION_FAILURE':
      case 'LOGIN_FAILURE':
      case 'LOGOUT_SUCCESS':
        console.log('Authentication failure, logout success')
        return {
          ...state,
          isFetching: false,
          loggedIn: false,
          id: null
        }
      default:
        console.log('Authentication default')
        return state
    }
  }

  return (state = {
    isFetching: false, // initiated with those values
    loggedIn: false,
    id: null
  }, action) => {
    console.log('Authentication: action from prev. middleware', state, action, mapActionToKey(action), mapActionToKey)
    // only matters if it comes from for other middlewares action
    if (action.error && ('undefined' === action.error.loggedUser || 'none' === action.error.loggedUser)) {
      return {
        id: undefined,
        loggedIn: false,
        isFetching: false
      }
    }

    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
      case requestType2:
      case successType2:
      case failureType2:
      case requestType3:
      case successType3:
      case failureType3:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        console.log('Authentication key: ' + key, state[key])
        return updateLoggedUser(state[key], action)
      default:
        return state
    }
  }
}

export default authenticate
