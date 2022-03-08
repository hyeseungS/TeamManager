import {createStore} from 'redux';
import {rootReducer} from './rootReducer';

export const makeStore = () => {
  return createStore(rootReducer);
};
