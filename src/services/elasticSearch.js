import axios from 'axios';
import {ELASTIC_SEARCH_API_URL, ELASTIC_SEARCH_API_KEY} from '@env';

const searchApi = axios.create({
  baseURL: ELASTIC_SEARCH_API_URL,
  headers: {
    Authorization: 'Bearer ' + ELASTIC_SEARCH_API_KEY,
    'Content-Type': 'application/json',
  },
});

const getQueryString = query => {
  const newQuery = query.replace(' ', '+');
  return `?q=${newQuery}`;
};

export const searchProductsByQueryString = async query => {
  const query = getQueryString(query);

  await searchApi
    .get(query)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
