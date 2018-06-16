export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return JSON.parse(serializedState) || {};
  } catch (c) {
    console.log('LST - err');
    return {};
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (c) {
    console.log('LST - err', c);
  }
};

export const deleteState = () => {
  try {
    localStorage.removeItem('state');
    localStorage.removeItem('X-SESSION-ID');
    localStorage.removeItem('X-CUSTOMER-ID');
  } catch (c) {
    console.log('LST - ', c);
  }
};

export const getAccessKeys = (sessionKey, customerKey) => {
  try {
    return {
      [sessionKey]: localStorage.getItem(sessionKey),
      [customerKey]: localStorage.getItem(customerKey),
    };
  } catch (c) {
    console.log('LST - ', c);
  }
};

export const setAccessKeys = ({ id = null, customer = null }) => {
  try {
    localStorage.setItem('X-SESSION-ID', id);
    localStorage.setItem('X-CUSTOMER-ID', customer);
  } catch (c) {
    console.log('LST - ', c);
  }
};

export const deleteAccessKeys = () => {
  try {
    localStorage.removeItem('X-SESSION-ID');
    localStorage.removeItem('X-CUSTOMER-ID');
  } catch (c) {
    console.log('LST - ', c);
  }
};

