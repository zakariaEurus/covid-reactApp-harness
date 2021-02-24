export const fetchGlobal = (data) => {
  console.log("fetch");
  return {
    type: "FETCH_GLOBAL",
    allCounts: data,
  };
};
export const fetchCountries = (data) => {
  return {
    type: "FETCH_COUNTRIES",
    countries: data,
  };
};
