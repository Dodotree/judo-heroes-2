import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './IndexPage';
import { AthletePage } from './AthletePage';
import { NotFoundPage } from './NotFoundPage';
import { loadUsers } from  '../actions'; 


class App extends Component {

  constructor(props) {
    super(props);
console.log('App constructor: props', props);
    let sto = props.store.getState();
    this.state = {
        date: new Date(), 
        url: '/images/',
        athletes: getAthletsFromStore(sto)
    };
  }

  componentWillMount() {
    console.log('App: componentWillMount, trigger first api call');
    // triggers API sync+Async Action Creator from "actions"(action creators)
    this.props.disp('athletes');
  }

  componentDidMount() {
    console.log('App: componentDidMount ', this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App: componentDidUpdate ', prevProps.isFetching, this.props.isFetching);
    if( prevProps.isFetching && !this.props.isFetching 
            && (JSON.stringify(prevProps.athlet_ids) !== JSON.stringify(this.props.athlet_ids)) ){
        let sto = this.props.store.getState();
        this.setState((prevState) => {
            return {athletes: getAthletsFromStore(sto)}
        });
    }
  }

  componentWillUnmount() {
  }

  render() {
    const url = this.state.url;
    return (
      <Layout url={url}>
        <Switch>
          <Route exact path="/" component={() => <IndexPage athletes={this.state.athletes} url={url}/>} />
          <Route exact path="/athlete/:id" render={({match, location, history, staticContext}) => {
              const id = match.params.id;
              const athlete = this.state.athletes.find(current => current.id === id);
              if (!athlete) {
                return <NotFoundPage staticContext={staticContext} />;
              }
              let sto = this.props.store.getState();
              return <AthletePage athlete={athlete} 
                                  athletes={this.state.athletes} 
                                  medals={sto.entities.medals} 
                                  countries={sto.entities.countries} 
                                  url={url}/>;
            }}/>
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

const getIsFetching = (state, key) => (state.pagination[key])? state.pagination[key].isFetching : false;

const getAthletIdsFromStore = (state) => state.pagination.athletes.ids.slice();

const getAthletsFromStore = (state) => {
    let athletes = [];
    for(let i=0; i<state.pagination.athletes.ids.length; i++){
        let athlet_id = state.pagination.athletes.ids[i];
        athletes.push(state.entities.athletes[athlet_id]);
    }
  return athletes;
}

const mapStateToProps = (state, { params }) => ({
    isFetching: getIsFetching(state,'athletes'),
    athlet_ids: getAthletIdsFromStore(state) 
})

export default App = withRouter(connect(mapStateToProps, {disp: loadUsers})(App));


