import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PurusasukthamPage from '@/app/purusasuktham/page';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Stub YouTube IFrame API so useEffect doesn't crash in jsdom
Object.defineProperty(window, 'YT', {
  value: { Player: jest.fn().mockImplementation(() => ({})), PlayerState: { ENDED: 0 } },
  writable: true,
});

const SANSKRIT_SAMPLE = 'पुरुष सूक्तम्\n\nline 2\nline 3';
const TAMIL_SAMPLE    = 'புருஷ ஸூக்தம்\n\nவரி 2\nவரி 3';
const TELUGU_SAMPLE   = 'పురుష సూక్తం\n\nవరుస 2\nవరుస 3';

beforeEach(() => {
  mockedAxios.get
    .mockResolvedValueOnce({ data: SANSKRIT_SAMPLE })
    .mockResolvedValueOnce({ data: TAMIL_SAMPLE })
    .mockResolvedValueOnce({ data: TELUGU_SAMPLE });
});

afterEach(() => jest.clearAllMocks());

describe('PurusasukthamPage', () => {
  it('renders Sanskrit and Tamil columns after data loads', async () => {
    render(<PurusasukthamPage />);
    await waitFor(() => expect(screen.getByText('புருஷ ஸூக்தம்')).toBeInTheDocument());
    expect(screen.getByText('पुरुष सूक्तम्')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sanskrit' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tamil' })).toBeInTheDocument();
  });

  it('hides Sanskrit column when toggle clicked', async () => {
    render(<PurusasukthamPage />);
    await waitFor(() => screen.getByText('पुरुष सूक्तम्'));
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sanskrit' }));
    expect(screen.queryByText('पुरुष सूक्तम्')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show Sanskrit' })).toBeInTheDocument();
  });

  it('hides Tamil column when toggle clicked', async () => {
    render(<PurusasukthamPage />);
    await waitFor(() => screen.getByText('புருஷ ஸூக்தம்'));
    fireEvent.click(screen.getByRole('button', { name: 'Hide Tamil' }));
    expect(screen.queryByText('புருஷ ஸூக்தம்')).not.toBeInTheDocument();
  });

  it('swaps Tamil column with Telugu when Show Telugu clicked', async () => {
    render(<PurusasukthamPage />);
    await waitFor(() => screen.getByText('புருஷ ஸூக்தம்'));
    fireEvent.click(screen.getByRole('button', { name: 'Show Telugu' }));
    expect(screen.getByRole('columnheader', { name: 'Telugu' })).toBeInTheDocument();
    expect(screen.getByText('పురుష సూక్తం')).toBeInTheDocument();
    expect(screen.queryByText('புருஷ ஸூக்தம்')).not.toBeInTheDocument();
  });

  it('swaps back to Tamil when Show Tamil clicked', async () => {
    render(<PurusasukthamPage />);
    await waitFor(() => screen.getByText('புருஷ ஸூக்தம்'));
    fireEvent.click(screen.getByRole('button', { name: 'Show Telugu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Tamil' }));
    expect(screen.getByRole('columnheader', { name: 'Tamil' })).toBeInTheDocument();
  });
});
