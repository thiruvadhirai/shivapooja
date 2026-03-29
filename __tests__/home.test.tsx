import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>);

describe('HomePage', () => {
  it('renders the site title', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Shiva Pooja' })).toBeInTheDocument();
  });

  it('links to Panchangam', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'Panchangam' })).toHaveAttribute('href', '/panchangam');
  });

  it('links to Purusa Suktham', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'Purusa Suktham' })).toHaveAttribute('href', '/purusasuktham');
  });
});
