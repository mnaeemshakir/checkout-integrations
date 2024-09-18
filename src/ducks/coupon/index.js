import * as types from './types';

const initialState = {
  data: {
    percentOff: 0,
    id: '',
    name: '',
    valid: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.COUPONSTATECLEAR:
      return {
        ...initialState,
      };
    case types.COUPONSTATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action?.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
