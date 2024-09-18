import { apiEndpoint, checkResponseStatus, checkResponseContentType, ApiError } from './baseApi';

const loginURI = 'auth/sign_in_v2';

export async function login(request) {
  const url = new URL(loginURI, apiEndpoint);
  url.search = new URLSearchParams(request).toString();
  let responseHeaders = null;
  return fetch(url.href, {
    method: 'POST',
    headers: {
      Connection: 'keep-alive',
    },
  })
    .then(checkResponseStatus)
    .then(response => {
      responseHeaders = response.headers;
      return response;
    })
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return {
          loggedIn: true,
          data: res.data,
          loginInfo: {
            accessToken: responseHeaders.get('access-token'),
            uid: responseHeaders.get('uid'),
            tokenType: responseHeaders.get('token-type'),
            client: responseHeaders.get('client'),
            expiry: responseHeaders.get('expiry'),
          },
        };
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
