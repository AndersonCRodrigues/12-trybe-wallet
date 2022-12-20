import P from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    cambio: 'BRL',
  };

  render() {
    const { email, expenses } = this.props;
    const { cambio } = this.state;

    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {expenses ? expenses
            .reduce((acc, { value, exchangeRates, currency }) => (
              acc + (+value * exchangeRates[currency].ask)), 0).toFixed(2) : 0}

        </p>
        <p data-testid="header-currency-field">{cambio}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    expenses: state.wallet.expenses || [],
  }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: P.string.isRequired,
  expenses: P.arrayOf(P.shape(P.string)).isRequired,
};
