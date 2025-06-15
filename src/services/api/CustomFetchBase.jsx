import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = 'https://bebetab-be.onrender.com/';
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message, 'error');
        } else {
          console.log('An unknown error occurred', 'error');
        }
      }
    }
    return headers;
  },
});

function reftoken() {
  if (typeof window !== 'undefined') {
    const getLocalStorageKeys = Object.keys(localStorage);
    const getBaseAuthIdToken = getKeyValuesByLocalStorage(
      /refreshtoken/gi,
      getLocalStorageKeys,
    );

    if (getBaseAuthIdToken) {
      const localStorageItem = localStorage.getItem(getBaseAuthIdToken);
      const getlocalStorageIdToken = localStorageItem
        ? JSON.parse(localStorageItem)
        : null;
      if (getlocalStorageIdToken?.secret) {
        localStorage.setItem('REFRESH_TOKEN', getlocalStorageIdToken.secret);
      }
    }
  }
}

function getKeyValuesByLocalStorage(pattern, getLocalStorageKeys) {
  let localStorageKey = '';
  getLocalStorageKeys?.forEach((values) => {
    if (values.match(pattern)) {
      localStorageKey = values;
    }
  });
  return localStorageKey;
}

const CustomFetchBase = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.clear();
      // window.location.reload();
    }

    if (result.error?.status === 401) {
      console.log('UnAuthorized', 'error');
      reftoken();
    }
    if (result.error?.status === 403) {
      const errorMessage = result.error.data?.error || 'Forbidden';
      console.log(errorMessage, 'error');
      // window.location.href = "/";
    }
  }

  return result;
};

export default CustomFetchBase;
