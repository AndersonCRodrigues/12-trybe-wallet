import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import saveEmail from '../redux/actions';

const NUMBER = 6;

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    disabled: true,
  };

  handleChage = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.handleValid);
  };

  handleValid = () => {
    const { email, senha } = this.state;
    const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const validEmail = reg.test(email);
    const validSenha = senha.length >= NUMBER;
    const validButton = validEmail && validSenha;
    this.setState({ disabled: !validButton });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    saveEmail(dispatch, email);
    history.push('/carteira');
  };

  render() {
    const { email, senha, disabled } = this.state;
    return (
      <section>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChage }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="senha"
            value={ senha }
            onChange={ this.handleChage }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: P.func.isRequired,
  history: P.shape({
    push: P.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
