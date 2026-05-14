/**
 * Generates a random ID
 * @returns {string}
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Truncates a string to a specified length
 * @param {string} str 
 * @param {number} num 
 * @returns {string}
 */
export const truncateString = (str, num) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
};

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
