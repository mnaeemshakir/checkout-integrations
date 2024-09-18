import { getFromStorage } from '../../utils/storage';

export const API_URL = `${process.env.BASE_API_URL}`;

export const baseHeaders = {
  'Content-Type': 'application/json',
};

export const secureHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Token ${getFromStorage('token')}`,
};
