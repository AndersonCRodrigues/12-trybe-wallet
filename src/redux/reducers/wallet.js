import { ADD_EXPENSES, CURRENCIES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  id: 0,
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case ADD_EXPENSES: {
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses, action.payload],
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
