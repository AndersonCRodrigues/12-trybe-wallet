import P from 'prop-types';
import React, { Component } from 'react';
import '../styles/Table.css';
import { connect } from 'react-redux';

class Table extends Component {
  state = {
    linha: ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'],
  };

  render() {
    const { linha } = this.state;
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {linha.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{(+item.value).toFixed(2)}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{`R$ ${(+item.exchangeRates[item.currency].ask).toFixed(2)}`}</td>
              <td>
                {`R$ ${
                  (+item.value * item.exchangeRates[item.currency].ask).toFixed(2)}`}

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: P.arrayOf(P.shape(P.string)).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
