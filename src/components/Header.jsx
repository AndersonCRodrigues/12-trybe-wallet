import P from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    despesa: 0,
    cambio: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { despesa, cambio } = this.state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{despesa}</p>
        <p data-testid="header-currency-field">{cambio}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: P.string.isRequired,
};
