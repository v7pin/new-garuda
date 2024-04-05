// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import crimeReducer from './crimeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  crime: crimeReducer,
});

const store = createStore(rootReducer);

export default store;
