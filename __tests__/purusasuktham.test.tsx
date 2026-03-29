import { render, screen, fireEvent } from '@testing-library/react';
import PurusasukthamClient from '@/app/purusasuktham/PurusasukthamClient';

jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>);

jest.mock('../app/purusasuktham/useVerseData', () => ({
  useVerseData: () => ({
    data: {
      sanskrit: ['पुरुष सूक्तम्', '', 'line 2'],
      tamil:    ['புருஷ ஸூக்தம்', '', 'வரி 2'],
      telugu:   ['పురుష సూక్తం', '', 'వరుస 2'],
    },
    error: null,
  }),
}));

Object.defineProperty(window, 'YT', {
  value: { Player: jest.fn().mockImplementation(() => ({})), PlayerState: { ENDED: 0 } },
  writable: true,
});

describe('PurusasukthamClient', () => {
  it('renders Sanskrit and Tamil columns by default', () => {
    render(<PurusasukthamClient />);
    expect(screen.getByRole('columnheader', { name: 'Sanskrit' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tamil' })).toBeInTheDocument();
    expect(screen.getByText('पुरुष सूक्तम्')).toBeInTheDocument();
    expect(screen.getByText('புருஷ ஸூக்தம்')).toBeInTheDocument();
  });

  it('hides Sanskrit column when toggled', () => {
    render(<PurusasukthamClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sanskrit' }));
    expect(screen.queryByText('पुरुष सूक्तम्')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show Sanskrit' })).toBeInTheDocument();
  });

  it('hides Tamil column when toggled', () => {
    render(<PurusasukthamClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide Tamil' }));
    expect(screen.queryByText('புருஷ ஸூக்தம்')).not.toBeInTheDocument();
  });

  it('swaps Tamil with Telugu', () => {
    render(<PurusasukthamClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Show Telugu' }));
    expect(screen.getByRole('columnheader', { name: 'Telugu' })).toBeInTheDocument();
    expect(screen.getByText('పురుష సూక్తం')).toBeInTheDocument();
    expect(screen.queryByText('புருஷ ஸூக்தம்')).not.toBeInTheDocument();
  });

  it('swaps back to Tamil', () => {
    render(<PurusasukthamClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Show Telugu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Tamil' }));
    expect(screen.getByRole('columnheader', { name: 'Tamil' })).toBeInTheDocument();
  });

  it('links to Sanskrit, Tamil, Telugu sub-pages', () => {
    render(<PurusasukthamClient />);
    expect(screen.getByRole('link', { name: 'Sanskrit' })).toHaveAttribute('href', '/purusasuktham/sanskrit');
    expect(screen.getByRole('link', { name: 'Tamil' })).toHaveAttribute('href', '/purusasuktham/tamil');
    expect(screen.getByRole('link', { name: 'Telugu' })).toHaveAttribute('href', '/purusasuktham/telugu');
  });
});
