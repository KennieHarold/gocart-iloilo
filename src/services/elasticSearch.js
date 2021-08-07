import axios from 'axios';
import {ELASTIC_SEARCH_API_URL, ELASTIC_SEARCH_API_KEY} from '@env';

const searchApi = axios.create({
  baseURL: ELASTIC_SEARCH_API_URL,
  headers: {
    Authorization: 'ApiKey ' + ELASTIC_SEARCH_API_KEY,
    'Content-Type': 'application/json',
  },
});

const getRequestBody = (name, storeId) => {
  const queryWithName = {
    query: {
      bool: {
        must: [{match: {name}}],
      },
    },
  };

  const queryWithNameAndStore = {
    query: {
      bool: {
        must: [{match: {name}}, {match: {storeId}}],
      },
    },
  };

  return storeId ? queryWithNameAndStore : queryWithName;
};

export const searchProductsByProductName = async query => {
  const requestBody = getRequestBody(query, null);

  const response = await searchApi.post('/', requestBody).catch(error => {
    console.log(error);
  });

  const hitsList = response.data.hits.hits;

  if (hitsList.length > 0) {
    return hitsList.map(hit => hit._source);
  } else {
    return [];
  }
};

export const searchStoreProductsByProductName = async (query, storeId) => {
  const requestBody = getRequestBody(query, storeId);

  const response = await searchApi.post('/', requestBody).catch(error => {
    console.log(error);
  });

  const hitsList = response.data.hits.hits;

  if (hitsList.length > 0) {
    return hitsList.map(hit => hit._source);
  } else {
    return [];
  }
};
