import axios from 'axios';
import {ELASTIC_SEARCH_API_URL, ELASTIC_SEARCH_API_KEY} from '@env';

const searchApi = axios.create({
  baseURL: ELASTIC_SEARCH_API_URL,
  headers: {
    Authorization: 'ApiKey ' + ELASTIC_SEARCH_API_KEY,
    'Content-Type': 'application/json',
  },
});

const getQueryString = query => {
  const newQuery = query.replace(' ', '+');
  return `?q=${newQuery}`;
};

export const searchProductsByQueryString = async query => {
  const queryString = getQueryString(query);

  const response = await searchApi.get(queryString).catch(error => {
    console.log(error);
  });

  const hitsList = response.data.hits.hits;

  if (hitsList.length > 0) {
    return hitsList.map(hit => hit._source);
  } else {
    return [];
  }
};
