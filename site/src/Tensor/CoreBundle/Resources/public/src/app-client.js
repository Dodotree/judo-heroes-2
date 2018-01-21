/* global window document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { normalize, schema } from 'normalizr';
import { Schemas } from  './middleware/api';
import  App  from './components/App';
import configureStore from './store/configureStore'


// Grab the state from a global variable injected into the server-generated HTML
const athletes = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

let normData = normalize(athletes, Schemas.USER_ARRAY);
let preloadedState = {
    "entities": normData.entities,
    "pagination": { 
        "athletes" : {    
            "isFetching": false,
            "nextPageUrl": undefined,
            "pageCount": 0,
            "ids": normData.result
         }
    }
};
const store = configureStore(preloadedState);

const AppClient = () => (
<div>
<Provider store={store}>
  <Router>
    <App store={store}/>
  </Router>
</Provider>
</div>
);

window.onload = () => {
  render(<AppClient />, document.getElementById('main'));
};
