/** @format */

import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
  const { isLoading, data: activeBookings } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });

  console.log(activeBookings);
  return { activeBookings, isLoading };
}
