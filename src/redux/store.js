// configure aqui sua store
import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;

if (window.Cypress) {
  window.store = store;
}
