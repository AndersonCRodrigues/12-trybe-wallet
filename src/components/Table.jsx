import React, { Component } from 'react';
import '../styles/Table.css';

class Table extends Component {
  state = {
    linha: ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'],
  };

  render() {
    const { linha } = this.state;
    return (
      <tr>
        {linha.map((item) => <th key={ item }>{item}</th>)}
      </tr>
    );
  }
}

export default Table;
