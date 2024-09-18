import { apiEndpoint, checkResponseStatus, checkResponseContentType, ApiError } from './baseApi';

const validateFbToken = 'auth/validate_fb_token';
const validateGoogleToken = 'auth/validate_google_token';

export async function validation(url) {
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

export async function validateFB(request) {
  const url = new URL(validateFbToken, apiEndpoint);
  url.search = new URLSearchParams(request).toString();
  return validation(url);
}

export async function validateGoogle(request) {
  const url = new URL(validateGoogleToken, apiEndpoint);
  url.search = new URLSearchParams(request).toString();
  return validation(url, request);
}
