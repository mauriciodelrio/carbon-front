import { push } from 'react-router-redux';
import _ from 'lodash';

const statusCodes = {
  200: () => console.log('OK'),
  201: () => console.log('CREATED'),
  204: () => console.log('NO CONTENT'),
  304: () => console.log('NOT MODIFIED'),
  400: () => console.log('BAD REQUEST'),
  401: () => console.log('UNAUTHORIZED'),
  403: (dispatch) => { 
    console.log('403, FORBIDDEN');
    dispatch(push('/error'));
  },
  404: () => console.log('NOT FOUND'),
  409: () => console.log('CONFLICT'),
  500: () => console.log('INTERNAL SERVER ERROR'),
  502: () => console.log('BAD GATEWAY'),
  503: () => console.log('SERVICE UNAVAILABLE'),
};

const ErrorTracker = () => store => dispatch => action => {
  dispatch(action);
  if (_.get(store.getState(), 'router.location.pathname') !== '/error') {
    const CODE = _.get(action, 'payload.status', false) || _.get(action, 'err.response.status', '');
    if (typeof statusCodes[CODE] === 'function') {
      statusCodes[CODE](dispatch);
    }
  }
};

export default ErrorTracker;
