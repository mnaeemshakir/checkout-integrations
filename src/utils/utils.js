/**
 * isNull checks that passed value is empty, undefined or null
 * @param {any} value
 * @returns {boolean}
 */
export const isNull = value => {
  return (
    value === '' ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};
