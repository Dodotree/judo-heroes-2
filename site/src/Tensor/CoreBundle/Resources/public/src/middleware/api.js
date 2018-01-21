import { normalize, schema } from 'normalizr';
import fetch from 'cross-fetch';


/* Action key */
export const CALL_API = 'Call API'

const API_ROOT = 'api'


const getNextPageUrl = response => {
  const pagination = response.headers.get('pagination')
console.log('API func getNextPageUrl', pagination);
  const url = "";
  if (!pagination) { return null }
  if (!url) { return null }
  return url
}


// Actual ajax call that returnes promise and resolves it
// then  normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  //  returns middleware function callApi
console.log('API Return AJAX call function');
  return fetch(fullUrl)
    .then(response => {  
        return response.json().then(json => {
console.log('API AJAX promise and json actually resolved');
            if (!response.ok) { return Promise.reject(json) }
            // next page url for pagination if any
            const nextPageUrl = getNextPageUrl(response)
            // creating new (partial)state object with normalized result + pagination
            // it's returned to the reducer, reducer will change state to a new one 
            // by merging this new partial one from response with current state
            let ret = Object.assign({}, normalize(json, schema), { nextPageUrl });
            return ret
        })
    })
}


// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {

console.log('API enter point');

  const callAPI = action[CALL_API] // action[CALL_API] should have "types", "endpint" and "schema"

  if (typeof callAPI === 'undefined') { return next(action) }


  let { endpoint } = callAPI
  // resolve if it's a function
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  const { schema, types } = callAPI
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  const [ requestType, successType, failureType ] = types

console.log('API create actionModifier to form action for next() middleware');
  // create function for removing our used params and feeding the rest to the next middleware (reducer)
  const actionWith = data => {
console.log('API next(actionWith()) called');
    const finalAction = Object.assign({}, action, data)
    // remove our used params action[CALL_API]: "types", "endpint" and "schema"
    delete finalAction[CALL_API]
    // the rest is action for the next middleware reducer
    return finalAction
  }
  // resolve syncronous next() first to take care of isFetching etc.
console.log('API sync next() call');
  next(actionWith({ type: requestType }))

console.log('API Return async api call function: (promise) with .then(Success next(), Fail next()) attached');
  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}




/* set Schemas */
const countrySchema = new schema.Entity('countries', 
    { owner: athletSchema }, 
    {
      idAttribute: country => country.id
    });

//Entity(key, definition = {}, options = {})

const medalSchema = new schema.Entity('medals', 
    { }, 
    {
      idAttribute: medal => medal.id
    });

const athletSchema = new schema.Entity('athletes', 
    {
        "country": countrySchema,
        "medals": [medalSchema]
    }, 
    {
      idAttribute: athlet => athlet.id
    });

export const Schemas = {
  USER: athletSchema,
  USER_ARRAY: [athletSchema]
}
/* End of set Schemas */

console.log('MIDDLEWARE INIT SCHEMAS');

