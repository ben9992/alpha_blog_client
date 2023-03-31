import axiosDep from 'axios';

const axios = axiosDep.create({
  baseURL: process.env.REACT_APP_API_SERVER_API_URL,
  headers: {
    Authorization: ``,
  },
});

function updateToken(newToken) {
    axios.defaults.headers['Authorization'] = `${newToken}`;
}
  
export { axios, updateToken };