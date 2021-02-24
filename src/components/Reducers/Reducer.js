const initialState = {
  allCounts: {},
  countries: [],
};

export default function Reducer(state = initialState, action) {
  console.log(action.countries);
  switch (action.type) {
    case "FETCH_GLOBAL":
      return {
        ...state,
        allCounts: action.allCounts,
      };
    case "FETCH_COUNTRIES":
      return {
        ...state,
        countries: action.countries,
      };
    default:
      return state;
  }
}
