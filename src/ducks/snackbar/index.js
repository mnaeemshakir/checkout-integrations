import * as types from './types';

const initialState = {
  data: {
    open: false,
    message: '',
    severity: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.SNACKBAR_CLEAR:
      return {
        ...initialState,
      };
    case types.SNACKBAR_SHOW:
      return {
        ...state,
        data: {
          open: true,
          ...action?.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
