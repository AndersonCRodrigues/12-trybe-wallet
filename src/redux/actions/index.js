// Coloque aqui suas actions
import LOGIN from './types';

export default function saveEmail(dispatch, payload) {
  dispatch({
    type: LOGIN,
    payload,
  });
}
