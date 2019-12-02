
export const getRandomNumBetween = (lower, upper) => {
  const nativeFloor = Math.floor;
  const nativeRandom = Math.random;
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
};