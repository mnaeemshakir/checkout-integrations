/* eslint-disable */
import { getFromStorage } from '../utils/storage';
import { baseApiEndpoint } from '../utils/envConstants';

export const apiEndpoint = baseApiEndpoint;

const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_AUTHENTICATED = 401;
const HTTP_REQUIRED = 402;
const HTTP_UNPROCESSABLE = 422;
const HTTP_SYSTEM_ERROR = 500;
const HTTP_SERVICE_UNAVAILABLE = 503;

export class ApiError extends Error {
  res;
  showUser;
}

/**
 * Parses the API response status and throws an error if the response status is not 200 (OK) or 201 (No Content).
 * @param response An API response
 * @returns The API response
 */
export async function checkResponseStatus(response) {
  switch (response.status) {
    case HTTP_NOT_AUTHENTICATED:
      const authenticationError = new ApiError('Login Failed: Email/password is incorrect.');
      authenticationError.res = response;
      authenticationError.showUser = true;
      throw authenticationError;
    case HTTP_SYSTEM_ERROR:
      const systemError = new ApiError('An unexpected error has occurred. Please contact the system administrator for support.');
      systemError.res = response;
      systemError.showUser = true;
      throw systemError;
    case HTTP_SERVICE_UNAVAILABLE:
      const serviceError = new ApiError('Server is temporarily unavailable. Please contact the system administrator for support.');
      serviceError.res = response;
      serviceError.showUser = true;
      throw serviceError;
    case HTTP_UNPROCESSABLE:
    case HTTP_REQUIRED:
      // const unprocessableError = new ApiError('Unprocessable Entity.');
      // unprocessableError.res = await response.json();
      // unprocessableError.showUser = true;
      throw await response.json();
    case HTTP_OK:
    case HTTP_NO_CONTENT:
    default:
      return response;
  }
}

/**
 * Parses the API response content type and throws an error
 * if the content type is not 'application/json' or 'text/plain'
 * @param response An API response
 * @returns Either the API JSON object (if content-type is 'application/json')
 * or the API text (if content type is 'text/plain')/
 */
export async function checkResponseContentType(response) {
  if (
    response &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').indexOf('application/json') !== -1
  ) {
    return response.json();
  } else if (
    response &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').indexOf('text/plain') !== -1
  ) {
    return response.text();
  }
  const error = new ApiError('Unexpected Response Content.');
  error.res = response;
  error.showUser = true;
  throw error;
}

/**
 * Parses the API response content type
 * @param response An API response
 * @returns Either the API JSON object (if content-type is 'application/json'),
 * the API text (if content type is 'text/plain') or otherwise 'Success'
 */
export async function parseResponseContentType(response) {
  if (
    response &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').indexOf('application/json') !== -1
  ) {
    return response.json();
  } else if (
    response &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').indexOf('text/plain') !== -1
  ) {
    return response.text();
  }

  return 'Success';
}

export async function fetchWithQueryParams(method, uri, params, headers = {}, body) {
  const url = new URL(uri, apiEndpoint);
  const search = new URLSearchParams(params).toString();
  url.search = search;
  return fetch(url.href, {
    method: method,
    headers: {
      ...headers,
      Connection: 'keep-alive',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
    .then(checkResponseStatus)
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return res;
      }

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    });
}

export async function fetchWithBody(method, uri, body, headers = {}) {
  const url = new URL(uri, apiEndpoint);
  return fetch(url.href, {
    method: method,
    headers: {
      ...headers,
      Connection: 'keep-alive',
    },
    body,
  })
    .then(checkResponseStatus)
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return res;
      }

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    });
}

/**
 * Base API class with methods for accessing the API using appropriate authentication and common headers.
 */
export class BaseApi {
  baseApiEndpoint;

  constructor() {
    this.baseApiEndpoint = apiEndpoint;
  }

  /**
   * Gets data from the API
   * @template O Expected request response object type
   * @param relativePath relative path to retrieve in the API
   * @returns The API response object as JSON/TEXT depending on content-type.
   */
  async get(relativePath) {
    return this.send('GET', new URL(relativePath, this.baseApiEndpoint))
      .then(checkResponseContentType)
      .then(responseBody => responseBody);
  }

  /**
   * Posts data to the API
   * @template I Expected request object type
   * @template O Expected request response object type
   * @param relativePath relative path to post in the API
   * @param requestBody request content to post to the API.
   * @returns The API response object as JSON/TEXT depending on content-type.
   */
  async post(relativePath, requestBody) {
    return this.sendData('POST', new URL(relativePath, this.baseApiEndpoint), requestBody)
      .then(checkResponseContentType)
      .then(responseBody => responseBody);
  }

  /**
   * Updates data in the API
   * @template I Expected request object type
   * @template O Expected request response object type
   * @param relativePath relative path to update in the API
   * @param requestBody request content update in the API.
   * @returns The API response object as JSON/TEXT depending on content-type.
   */
  async put(relativePath, requestBody) {
    return this.sendData('PUT', new URL(relativePath, this.baseApiEndpoint), requestBody)
      .then(checkResponseContentType)
      .then(responseBody => responseBody);
  }

  /**
   * Deletes data from the API
   * @param relativePath relative path to delete in the API
   * @template O Expected request response object type
   * @returns The API response object as JSON/TEXT depending on the content-type.
   */
  async delete(relativePath) {
    return this.send('DELETE', new URL(relativePath, this.baseApiEndpoint))
      .then(parseResponseContentType)
      .then(responseBody => responseBody);
  }

  async sendData(method, url, body) {
    return fetch(url.href, {
      method,
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${getFromStorage('token')}`,
      },
      body: body ? JSON.stringify(body) : null,
    }).then(checkResponseStatus);
  }

  async send(method, url) {
    return fetch(url.href, {
      method,
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${getFromStorage('token')}`,
      },
    }).then(checkResponseStatus);
  }
}

export const Api = new BaseApi();
