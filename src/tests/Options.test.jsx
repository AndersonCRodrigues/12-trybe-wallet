import { render, screen } from '@testing-library/react';
import Options from '../components/Options';

describe('<Options', () => {
  it('deve estar na tela', () => {
    render(<Options valor="teste" />);
    const opt = screen.getByText('teste');
    expect(opt).toBeInTheDocument();
    expect(opt).toHaveValue('teste');
  });
});
