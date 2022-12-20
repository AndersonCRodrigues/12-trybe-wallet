import fetchCurrencies from '../../components/utils/fetch';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const ADD_CHANGES = 'ADD_CHANGES';

export const saveEmail = (dispatch, payload) => {
  dispatch({
    type: LOGIN,
    payload,
  });
};

export const arrayCurrencies = async (dispatch) => {
  const json = await fetchCurrencies();
  const data = Object.keys(json).filter((moeda) => moeda !== 'USDT');
  dispatch({ type: CURRENCIES, payload: data });
};

export const saveExpense = async (dispatch, payload) => {
  const json = await fetchCurrencies();
  payload.exchangeRates = json;
  dispatch({
    type: ADD_EXPENSES,
    payload,
  });
};

export const removeExpenses = (dispatch, payload) => {
  dispatch({
    type: REMOVE_EXPENSES,
    payload,
  });
};

export const editExpenses = (dispatch, payload) => {
  dispatch({
    type: EDIT_EXPENSES,
    payload,
  });
};

export const addChanges = (dispatch, payload) => {
  dispatch({
    type: ADD_CHANGES,
    payload,
  });
};
