import { render, screen } from '@testing-library/react';
import PanchangamPage from '@/app/panchangam/page';

describe('PanchangamPage', () => {
  it('renders the heading', () => {
    render(<PanchangamPage />);
    expect(screen.getByRole('heading', { name: 'Panchangam' })).toBeInTheDocument();
  });

  it('renders all 11 sankalpa lines', () => {
    render(<PanchangamPage />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(11);
  });

  it('renders the first and last lines', () => {
    render(<PanchangamPage />);
    expect(screen.getByText('Krouncha Dweepe')).toBeInTheDocument();
    expect(screen.getByText('Pooram Nakshatre')).toBeInTheDocument();
  });
});
