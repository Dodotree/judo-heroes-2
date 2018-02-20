import axios from 'axios'
import * as d3 from 'd3'
import merge from 'lodash/merge'
import { normalize } from 'normalizr'
// import fetch from 'cross-fetch'

import { Schemas } from '../schemas'

const API_ROOT = ''
/* Action key */
export const CALL_API = 'Call API'

/// ///////////////////////////////////////////////
/// ////////// api to state helper
/// ///////////////////////////////////////////////
let apiKeyToSchema = {
  'loggedUser': {'schema': Schemas.LOGGED_USER, 'selected': true},
  'user': {'schema': Schemas.USER, 'selected': false},
  'users': {'schema': Schemas.USER_ARRAY, 'selected': true},
  'athlete': {'schema': Schemas.ATHLETE, 'selected': false},
  'athletes': {'schema': Schemas.ATHLETE_ARRAY, 'selected': true}
}

export const normalizeChartData = (chart, offset) => chart.columns.slice(offset).map((id, index) => ({
    id: id,
    domain: d3.extent(chart.data, d => d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0, 0, 0, 0)),
    values: chart.data.map(d => ({
        timestamp: d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0, 0, 0, 0),
        value: d[index + offset]
    }))
  }))

export const normalizeResponse = (response) => {
  let nEntities = {}
  let nPagination = {}
  let nSelection = {}
  let respPagination = ('undefined' !== typeof response.pagination) ? response.pagination : {}

  let respCharts = null
  if('undefined' !== typeof response.charts) {
    for (var key in response.charts) {
      response.charts[key].data = normalizeChartData(response.charts[key], 1)
    }
    respCharts = response.charts
  }

  for (var key in apiKeyToSchema) {
    if ('undefined' !== typeof response[key]) {
      var normData = normalize(response[key], apiKeyToSchema[key].schema)
      nEntities = merge({}, nEntities, normData.entities)
      if (apiKeyToSchema[key].selected && 'object' === typeof normData.result) {
        if ('undefined' !== typeof respPagination[key]) {
          nPagination[key] = respPagination[key]
          nSelection[key] = { ids: respPagination[key].ids.slice() }
        } else {
          nPagination[key] = { ids: normData.result }
          nSelection[key] = { ids: normData.result.slice() }
        }
      } else if (apiKeyToSchema[key].selected) {
        nPagination[key] = normData.result
        nSelection[key] = normData.result
      }
    }
  }
  return { 'entities': nEntities, 'pagination': nPagination, 'selections': nSelection, 'charts': respCharts }
}

/// ///////////////////////////////////////////////
/// ////////// Redux Thunk middleware
/// ///////////////////////////////////////////////

// Actual ajax call that returnes promise and resolves it
// then  normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, data, options) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  //  returns middleware function callApi
  console.log('API Return AJAX call function')

  return axios.post(fullUrl, data)
    .then(response => {
      if (response.statusText !== 'OK') { return Promise.reject(response) }
      if (!response.data) { return response }
      if (response.data.successes) {
        const normalizedData = normalizeResponse(response.data.successes)
        return Object.assign({}, normalizedData)
      }
      if (response.data.errors) {
        return Promise.reject(response.data.errors)
      }
      if (response.data.warnings) {
      }
      return response
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) { // login failure
        }
        return Promise.reject({message: error.response.data.error})
      } else if (error.request) {
        return Promise.reject({message: error.request})
      }
      return Promise.reject({message: error.message})
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  console.log('API enter point')
  const callAPI = action[CALL_API]

  // Skips API middleware if action doesn't have valid RSAA object
  if (typeof callAPI === 'undefined') { return next(action) }

  // action[CALL_API] should have "types", "endpoint" check/resolve all of them
  let { endpoint } = callAPI
  // resolve if it's a function to find string url
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') { throw new Error('Specify a string endpoint URL.') }

  const { types, data } = callAPI
  if (!Array.isArray(types) || types.length !== 3) { throw new Error('Expected an array of three action types.') }
  if (!types.every(type => typeof type === 'string')) { throw new Error('Expected action types to be strings.') }

  const [ requestType, successType, failureType ] = types

  // create actionModifier function for removing our used params and feeding the rest to the next middleware (reducer)
  console.log('API create actionModifier to form action for next() middleware')
  const actionWith = data => {
    console.log('API next(actionWith()) called', action, data)
    const finalAction = Object.assign({}, action, data)
    // remove our Symbol [CALL_API] as we don't need API call anymore
    delete finalAction[CALL_API] // the rest is action for the next middleware reducer
    return finalAction
  }
  // resolve syncronous next() first to take care of isFetching etc.
  next(actionWith({ type: requestType }))

  // return fetching function, as original caller function will wait for it to finish before execution
  console.log('API Return async api call function: (promise) with .then(Success next(), Fail next()) attached')

  let options = ('LOGIN_REQUEST' === requestType) ? {} : {headers: { 'Content-Type': ['application/x-www-form-urlencoded'] }}
  let mydata = ('LOGIN_REQUEST' === requestType) ? data : toFormData(data)

  return callApi(endpoint, mydata, options)
    .then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened' // fetch suppose to have .message
      }))
    )
}

/// ///////////////////////////////////////////////
/// ////////// end of Redux Thunk middleware
/// ///////////////////////////////////////////////

/// ///////// vue forms provide object but not a serialized params string /////////
/// ///////// json string will not get into $_GET nor $_POST recognizaple by server
/// ///////// toFormData works around that problem
function toFormData (tree, namespace) {
  let flats = []
  toFormDataIterator(tree, namespace, flats)
  return flats.join('&')
}

function toFormDataIterator (tree, namespace, flats) {
  for (let property in tree) {
    let val = tree[property]
    val = (val instanceof Date) ? val.toISOString() : val
    let formKey = (namespace) ? namespace + '[' + property + ']' : property

    if (typeof val === 'object' && !(val instanceof File)) {
      toFormDataIterator(val, formKey, flats)
    } else {
      formKey = cleanKey(formKey)
      flats.push(formKey + '=' + val)
    }
  }
}

function cleanKey (str) {
  var replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  }
  return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function (match) {
    return replace[match]
  })
}
/// ////////// end of toFormData /////////////////////
