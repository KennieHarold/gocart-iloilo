import axios from 'axios';
import {
  ELASTIC_SEARCH_API_URL,
  ELASTIC_SEARCH_DEV_API_URL,
  ELASTIC_SEARCH_API_KEY,
  APP_ENV,
} from '@env';

const appEnv = APP_ENV;

//console.log('Env: ', appEnv);
console.log(ELASTIC_SEARCH_API_KEY);
console.log(ELASTIC_SEARCH_API_URL);
console.log(ELASTIC_SEARCH_DEV_API_URL);

const apiKey = ELASTIC_SEARCH_API_KEY;

const apiUrl =
  appEnv === 'production' ? ELASTIC_SEARCH_API_URL : ELASTIC_SEARCH_DEV_API_URL;

const searchApi = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: 'Basic ' + apiKey,
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
