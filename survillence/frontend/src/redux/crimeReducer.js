const initialState = {
  logs: [
    { date: "2024-04-01", time: "12:00", type: 'Arson', reported: true },
    { date: "2024-04-02", time: "15:30", type: 'Robbery', reported: true },
    { date: "2024-04-03", time: "17:45", type: 'Vandalism', reported: true },
    // ...any other hardcoded logs
  ],
};

const crimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CRIME_REPORT':
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export default crimeReducer;
