// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';

export const saveEmail = (dispatch, payload) => {
  dispatch({
    type: LOGIN,
    payload,
  });
};

export const arrayCurrencies = async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const json = await response.json();
  const data = Object.keys(json).filter((moeda) => moeda !== 'USDT');
  dispatch({ type: CURRENCIES, payload: data });
};
