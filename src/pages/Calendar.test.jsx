/** @format */

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import BookingsCalendar from './Calendar'; // Adjust path as necessary
import useAllBookings from '../features/bookings/useAllBookings';

// Mock the useAllBookings hook
jest.mock('../features/bookings/useAllBookings');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests
    },
  },
});

// Wrapper component for providing necessary contexts
const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('BookingsCalendar Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useAllBookings.mockReset();
    // Clear query cache
    queryClient.clear();
  });

  test('renders without crashing', () => {
    useAllBookings.mockReturnValue({
      isLoading: true,
      bookings: [],
      error: null,
    });
    render(<BookingsCalendar />, { wrapper: AllTheProviders });
    expect(screen.getByText(/loading bookings.../i)).toBeInTheDocument();
  });

  test('displays loading state correctly', () => {
    useAllBookings.mockReturnValue({
      isLoading: true,
      bookings: [],
      error: null,
    });
    render(<BookingsCalendar />, { wrapper: AllTheProviders });
    expect(screen.getByText(/loading bookings.../i)).toBeInTheDocument();
  });

  test('displays error state correctly', () => {
    useAllBookings.mockReturnValue({
      isLoading: false,
      bookings: [],
      error: { message: 'Failed to fetch bookings' },
    });
    render(<BookingsCalendar />, { wrapper: AllTheProviders });
    expect(screen.getByText(/error loading bookings: Failed to fetch bookings/i)).toBeInTheDocument();
  });

  test('renders calendar and events when bookings are loaded', async () => {
    const mockBookings = [
      {
        id: 1,
        startDate: '2024-03-10T00:00:00.000Z',
        endDate: '2024-03-12T00:00:00.000Z',
        guests: { fullName: 'John Doe' },
        cabins: { name: 'Cabin 001' },
      },
      {
        id: 2,
        startDate: '2024-03-15T00:00:00.000Z',
        endDate: '2024-03-17T00:00:00.000Z',
        guests: { fullName: 'Jane Smith' },
        cabins: { name: 'Cabin 002' },
      },
    ];

    useAllBookings.mockReturnValue({
      isLoading: false,
      bookings: mockBookings,
      error: null,
    });

    render(<BookingsCalendar />, { wrapper: AllTheProviders });

    // Check for the calendar container (react-big-calendar typically adds .rbc-calendar)
    // Waiting for elements to appear as calendar rendering might be async
    await waitFor(() => {
      expect(document.querySelector('.rbc-calendar')).toBeInTheDocument();
    });

    // Check if event titles are rendered
    // react-big-calendar typically renders event titles in elements with class .rbc-event-content
    await waitFor(() => {
      expect(screen.getByText('Booking: John Doe - Cabin 001')).toBeInTheDocument();
      expect(screen.getByText('Booking: Jane Smith - Cabin 002')).toBeInTheDocument();
    });
  });

  test('renders calendar with no events when bookings array is empty', async () => {
    useAllBookings.mockReturnValue({
      isLoading: false,
      bookings: [],
      error: null,
    });

    render(<BookingsCalendar />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(document.querySelector('.rbc-calendar')).toBeInTheDocument();
    });
    
    // Check that no event elements are present.
    // This depends on how react-big-calendar renders events.
    // If it renders a container for events even if empty, this test needs adjustment.
    // For now, we'll assume .rbc-event is specific to actual event items.
    expect(document.querySelector('.rbc-event')).toBeNull();
  });
});
