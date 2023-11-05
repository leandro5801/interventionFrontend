import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'X-Custom-Header': 'foobar'
  }
});

export default instance;