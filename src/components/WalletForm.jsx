import P from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Options from './Options';
import { addChanges, arrayCurrencies, saveExpense } from '../redux/actions';

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
    update: true,
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch, editor, expenses, idToEdit } = this.props;
    arrayCurrencies(dispatch);
    if (editor) {
      this.setState({
        valor: expenses[idToEdit].value,
        descricao: expenses[idToEdit].description,
      });
    }
  }

  componentDidUpdate() {
    const { editor, expenses, idToEdit } = this.props;
    const { update } = this.state;
    if (editor && update) {
      this.setState({
        valor: expenses[idToEdit].value,
        descricao: expenses[idToEdit].description,
        moeda: expenses[idToEdit].currency,
        pagamento: expenses[idToEdit].method,
        categoria: expenses[idToEdit].tag,
        update: false,
      });
    }
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

    if (valor !== '' && descricao !== '') {
      saveExpense(dispatch, info);

      this.setState({
        ...INITIAL_STATE,
      });
    }
  };

  handleEdit = () => {
    const { expenses, dispatch, idToEdit } = this.props;
    const { moeda, pagamento, categoria, descricao, valor } = this.state;
    expenses[idToEdit].value = valor;
    expenses[idToEdit].description = descricao;
    expenses[idToEdit].currency = moeda;
    expenses[idToEdit].method = pagamento;
    expenses[idToEdit].tag = categoria;
    addChanges(dispatch, expenses);
    this.setState({ ...INITIAL_STATE, update: true });
  };

  render() {
    const { arrayPagamentos, arrayCategorias,
      descricao, valor, moeda, categoria, pagamento } = this.state;
    const { currencies, editor } = this.props;

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
            value={ moeda }
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
            value={ pagamento }
          >
            {arrayPagamentos.map((pagament, index) => (
              <Options
                key={ pagament + index }
                valor={ pagament }

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
            value={ categoria }
          >
            {arrayCategorias.map((category, index) => (<Options
              key={ category + index }
              valor={ category }

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
        {editor
          ? (
            <button type="button" onClick={ this.handleEdit }>Editar despesa</button>
          )
          : (
            <button type="button" onClick={ this.handleClick }>Adicionar Despesas</button>
          )}

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: P.func.isRequired,
  currencies: P.arrayOf(P.string).isRequired,
  id: P.number.isRequired,
  editor: P.bool.isRequired,
  idToEdit: P.number.isRequired,
  expenses: P.arrayOf(P.shape(P.string)).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  id: state.wallet.id,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
