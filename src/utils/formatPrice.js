/**
 * Formats a number as Ethiopian Birr (ETB)
 * @param {number} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(price);
};
