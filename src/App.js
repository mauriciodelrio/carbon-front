import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import moment from 'moment';
import { getStore } from './store';
import { loadState, saveState } from './localStore';

import Login from './pages/Login';
import Footer from './pages/Footer';
import Ranking from './pages/Ranking';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Buscar from './pages/Buscar';
import Carpetas from './pages/Carpetas';
import Cuenta from './pages/Cuenta';
import HandleError from './pages/Error';
import GestionUsuarios from './pages/GestionUsuarios';
import GestionMaterial from './pages/GestionMaterial';
import DetalleCarrera from './pages/DetalleCarrera';
import NuevoUsuario from './pages/NuevoUsuario';

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
  const session = _.get(props, 'user.session', false)
  const isLoggedIn =  session && moment().format('DD-MM-YYYY hh:mm:ss') <= moment(props.user.session.session_expired_at).format('DD-MM-YYYY hh:mm:ss');
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
                  <Route path="/search" component={Buscar} />
                  <Route path="/folders" component={Carpetas} />
                  <Route path="/ranking" component={Ranking} />
                  <Route path="/users" component={GestionUsuarios} />
                  <Route path="/user/new" component={NuevoUsuario} />
                  <Route path="/materials" component={GestionMaterial} />
                  <Route path="/:ins_id/:dept_id/career/:career_id" component={DetalleCarrera} />
                  <Route exact path="/" component={Landing} />
                </Switch>
              </div>
            </div>
          ) : (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/error" component={HandleError} />
              <Route path="/login" component={Login} />
              <Route component={Landing} />
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
