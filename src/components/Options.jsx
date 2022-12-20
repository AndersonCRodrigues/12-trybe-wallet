import React, { Component } from 'react';
import P from 'prop-types';

export default class Options extends Component {
  render() {
    const { valor } = this.props;
    return (
      <option value={ valor }>{valor}</option>
    );
  }
}

Options.propTypes = {
  valor: P.string.isRequired,
};
