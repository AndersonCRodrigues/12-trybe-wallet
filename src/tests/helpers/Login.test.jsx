import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWith';

describe('<Login/>', () => {
  it('deve estar na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByText('Email');
    const senha = screen.getByText('Senha');
    const btn = screen.getByRole('button', { name: 'Entrar' });

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('testa o botão', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const senha = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar' });

    expect(btn).toBeDisabled();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, '12345');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'teste');
    expect(btn).toBeDisabled();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, '123456');
    expect(btn).toBeEnabled();
  });
});
