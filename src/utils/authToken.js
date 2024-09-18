import { getFromStorage } from './storage';

export default {
  check: () => {
    return !!getFromStorage('token');
  },
  clear: () => {},
};
