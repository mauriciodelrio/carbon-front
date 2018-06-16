import cookie from 'react-cookies';

export const getAccessKeys = (sessionKey = 'X-SESSION-ID', customerKey = 'X-CUSTOMER-ID') => {
  try {
    return {
      [sessionKey]: cookie.load(sessionKey),
      [customerKey]: cookie.load(customerKey),
    };
  } catch (c) {
    console.log('LST - ', c);
  }
};

export const setAccessKeys = ({
  id = null,
  customer = null,
}) => {
  try {
    cookie.save('X-CUSTOMER-ID', customer, {
      path: '/',
    });
    cookie.save('X-SESSION-ID', id, {
      path: '/',
    });
  } catch (c) {
    console.log('LST - ', c);
  }
};

export const deleteAccessKeys = () => {
  try {
    cookie.remove('X-SESSION-ID', {
      path: '/',
    });
    cookie.remove('X-CUSTOMER-ID', {
      path: '/',
    });
  } catch (c) {
    console.log('LST - ', c);
  }
};
