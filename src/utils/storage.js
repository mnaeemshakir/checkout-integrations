import SimpleCrypto from 'simple-crypto-js';

const secretKey = '<Key>';
const encryptor = new SimpleCrypto(secretKey);

export const SecureStorage = {
  instantiate: myStorage => {
    return {
      set: (key, objectNotation) => {
        myStorage.setItem(key, encryptor.encrypt(objectNotation));
      },
      get: key => {
        if (myStorage.getItem(key)) {
          return encryptor.decrypt(myStorage.getItem(key));
        }
        return null;
      },
      clear: () => {
        myStorage.clear();
      },
    };
  },
};

export const setToStorage = (key, value, keep) => {
  const storage = SecureStorage.instantiate(keep ? localStorage : sessionStorage);
  storage.set(key, value);
};

export const getFromStorage = key => {
  const ls = SecureStorage.instantiate(localStorage);
  const ss = SecureStorage.instantiate(sessionStorage);

  return ls.get(key) || ss.get(key);
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export default SecureStorage;
