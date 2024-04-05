export const setUserRole = (role) => ({
  type: 'SET_USER_ROLE',
  payload: role,
});

// New action to set the user's data
export const setPersonalDetails = (details) => ({
  type: 'SET_PERSONAL_DETAILS',
  payload: details,
});


export const addCrimeReport = (report) => ({
  type: 'ADD_CRIME_REPORT',
  payload: report,
});
