export const getHashCode = (hash) => {
  let i;
  let chr;
  if (hash.length === 0) return hash;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < hash.length; i++) {
    chr = hash.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
