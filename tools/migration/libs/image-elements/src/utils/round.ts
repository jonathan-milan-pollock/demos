export const round = (value: number, decimals: number = 0) => {
  return Number(
    Math.round(parseFloat(`${value}e${decimals}`)) + "e-" + decimals,
  );
};
