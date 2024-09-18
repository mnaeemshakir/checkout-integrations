import * as types from './types';

const initialState = {
  data: {
    paypalToken: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.SET_USER_PAYPAL_TOKEN:
      return {
        ...state,
        data: {
          ...state.data,
          paypalToken: action?.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
