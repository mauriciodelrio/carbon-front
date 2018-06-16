import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { getStore } from './store';
import { loadState, saveState } from './localStore';

import Login from './pages/Login';
import Footer from './pages/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Buscar from './pages/Buscar';
import Cuenta from './pages/Cuenta';
import HandleError from './pages/Error';

// https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js
const muiTheme = getMuiTheme({
  stepper: {
    iconColor: '#FF550F',
  },
  datePicker: {
    color: '#FF550F',
    textColor: 'white',
    calendarTextColor: 'black',
    selectColor: '#FF550F',
    selectTextColor: 'white',
    calendarYearBackgroundColor: '#FF550F',
    headerColor: '#FF550F',
  },
  flatButton: {
    buttonFilterColor: '#FF550F',
    primaryTextColor: '#FF550F',
  },
  menuItem: {
    hoverColor: '#FF550F',
  },
});

const history = createHistory();
history.listen(() => { window.scrollTo(0, 0); });
const store = getStore(_.merge({}, loadState()), history);

store.subscribe(() => saveState({
  user: store.getState().user,
  routing: store.getState().routing,
}));

const Main = (props) => {
  const isLoggedIn = props.user.user_state;
  return (
    <Router history={history}>
      <div className="flex-footer">
        <div className="content" >
          {isLoggedIn ? (
            <div>
              <div className="content">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/home" component={Home} />
                  <Route path="/error" component={HandleError} />
                  <Route path="/buscar" component={Buscar} />
                  <Route exact path="/" component={Landing} />
                </Switch>
              </div>
            </div>
          ) : (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/error" component={HandleError} />
              <Route path="/login" component={Login} />
            </Switch>
          )}
        </div>
        <footer>
          <Route component={Footer} />
        </footer>
      </div>
    </Router>
  );
};
const mapStateToProps = state => ({
  user: _.get(state, 'user.data', {}),
});
const mapDispatchToProps = () => ({});

const Wrapper = connect(mapStateToProps, mapDispatchToProps)(Main);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Wrapper />
        </MuiThemeProvider>
      </Provider>
    );
  }
}
