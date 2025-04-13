/** @format */
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export default function useRecenStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last') ? 7 : searchParams.get('last');

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const staysConfirmed = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );
  return { isLoading, staysConfirmed, stays };
}
