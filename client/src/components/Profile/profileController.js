const url = (process.env.NODE_ENV === 'production') ? 'https://carbonhub.org' : 'http://localhost:3080';

const options = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('id_token')}`
  }
};

/* Function to get API key */

export const getKey = () => {
  options.method = 'GET';
  return fetch(`${url}/auth/key`, options).then(res => res.json());
};

/* Function to create API key */

export const createKey = () => {
  options.method = 'POST';
  return fetch(`${url}/auth/key`, options).then(res => res.json());
};

/* Function to delete API key */

export const deleteKey = () => {
  options.method = 'DELETE';
  return fetch(`${url}/auth/key`, options).then(res => res.json());
};
