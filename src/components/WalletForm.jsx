import P from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Options from './Options';
import { arrayCurrencies, saveExpense } from '../redux/actions';

const INITIAL_STATE = {
  valor: '',
  moeda: 'USD',
  pagamento: 'Dinheiro',
  categoria: 'Alimentação',
  descricao: '',
};

class WalletForm extends Component {
  state = {
    arrayPagamentos: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    arrayCategorias: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    arrayCurrencies(dispatch);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { moeda, pagamento, categoria, descricao, valor } = this.state;
    const { id, dispatch } = this.props;
    const info = {
      id,
      value: valor,
      description: descricao,
      currency: moeda,
      method: pagamento,
      tag: categoria,
    };

    saveExpense(dispatch, info);

    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { arrayPagamentos, arrayCategorias,
      descricao, valor } = this.state;
    const { currencies } = this.props;

    return (
      <form action="">
        <label htmlFor="valor">
          Valor
          <input
            type="text"
            name="valor"
            id="valor"
            value={ valor }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            name="moeda"
            id="moeda"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies && currencies.map((item, index) => (<Options
              key={ item + index }
              valor={ item }
            />))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento
          <select
            name="pagamento"
            id="pagamento"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            {arrayPagamentos.map((pagamento, index) => (
              <Options
                key={ pagamento + index }
                valor={ pagamento }
              />))}
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            name="categoria"
            id="categoria"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            {arrayCategorias.map((categoria, index) => (<Options
              key={ categoria + index }
              valor={ categoria }
            />))}
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição
          <input
            type="text"
            name="descricao"
            id="descricao"
            data-testid="description-input"
            value={ descricao }
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar Despesas</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: P.func.isRequired,
  currencies: P.arrayOf(P.string).isRequired,
  id: P.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  id: state.wallet.id,
});

export default connect(mapStateToProps)(WalletForm);
