import { createAction } from '../utils/actions';
import { SNACKBAR_SHOW, SNACKBAR_CLEAR } from './types';

export const clearSnackbar = createAction(SNACKBAR_CLEAR);
export const showSnackbar = createAction(SNACKBAR_SHOW);
