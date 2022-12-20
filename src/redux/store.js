// configure aqui sua store
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from './reducers/user';
import walletReducer from './reducers/wallet';

const rootRedcucer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

const store = createStore(rootRedcucer, composeWithDevTools());

export default store;

if (window.Cypress) {
  window.store = store;
}
