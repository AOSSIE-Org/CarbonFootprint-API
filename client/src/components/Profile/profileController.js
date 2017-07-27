import Auth from '../../Auth/Auth';

const options = {
  headers: {
    authorization: `Bearer ${new Auth().getAccessToken()}`
  }
};

export const getKey = () => {
  options.method = 'GET';
  return fetch('/auth/key', options).then(res => res.json());
};

export const createKey = () => {
  options.method = 'POST';
  return fetch('/auth/key', options).then(res => res.json());
};

export const deleteKey = () => {
  options.method = 'DELETE';
  return fetch('/auth/key', options).then(res => res.json());
};
