import Vue from 'vue'
import router from './router'
import App from './App'

import assign from 'lodash/assign'

import configureStore from './store/configureStore'
import { normalizeResponse } from './middleware/api'
import * as Actions from './actions'

let initialState = JSON.parse(window.__PRELOADED_STATE__)
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

let nInitialState = normalizeResponse(initialState)
let loggedIn = ('undefined' !== typeof nInitialState.selections.loggedUser)

let preloadedState = {
  'entities': nInitialState.entities,
  'selections': nInitialState.selections,
  'loggedUser': {
    'id': (loggedIn) ? nInitialState.selections.loggedUser : undefined,
    'loggedIn': loggedIn,
    'isFetching': false
  },
  'pagination': {
    'athletes': {
      isFetching: false,
      ids: [],
      current: 1,
      first: 1,
      last: 1,
      startPage: 1,
      endPage: 1,
      next: 1,
      previous: 1,
      pagesInRange: [1],
      numItemsPerPage: 1,
      pageParameterName: 'Page'
    }
  },
  'counterValue': 0
}
preloadedState.pagination = assign({}, preloadedState.pagination, nInitialState.pagination)

let store = configureStore(preloadedState)

let mapStateToRoute = (state) => {
  let storeState = store.getState()
  console.log(':::::::::::::', storeState.entities, storeState.selections)
  console.log('**************** routing state **************', router.history.current, state.loggedUser, state.loggedUser.loggedIn)
  if (router.history.current.meta.requireLogout && state.loggedUser.loggedIn) {
    console.log('**************** Route to private', storeState.pagination.athletes.current)
    router.push('/home/' + storeState.pagination.athletes.current)
    // named route didn't create URL for some reason
    // router.push({name: 'private', subpageId: storeState.pagination.athletes.current})
  } else if (router.history.current.meta.requireLogin && !state.loggedUser.loggedIn) {
    router.push({name: 'LoginForm'})
  }
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let storeState = store.getState()
  console.log('!!!!!!!!!!!!!!!!! before route !!!', to, to.meta, to.params, from)
  console.log('>>>>>>>>>>>', storeState.pagination)
  if (to.meta.paginationKey) {
    let itemPagination = storeState.pagination[to.meta.paginationKey]
    if ('undefined' !== typeof itemPagination) {
      if (itemPagination.current !== Number(to.params.subpageId)) {
        console.log('Call action creator for fetching given key')
        store.dispatch(
          Actions.loadSubpage(to.meta.paginationKey, {[to.meta.paginationKey]: to.params.subpageId})
        )
      } else {
        console.log('Already paginated', Actions.loadSubpage, storeState.pagination[to.meta.paginationKey])
        // store.dispatch(Actions.loadSubpage(to.meta.paginationKey, to.params.subpageId))
      }
    } else {
      console.log('Routing key for pagination does not exist in state pagination')
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  provide: { store: store, mapStateToRoute: mapStateToRoute },
  components: { App }
})
