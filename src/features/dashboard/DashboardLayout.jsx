/** @format */

import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import useRecentStays from './useRecentStays';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 1024px) {
    display: block;

    & > * {
      margin-bottom: 2.4rem;
    }
  }
`;

// const SecondStat = styled.div`
//   display: flex;

//   gap: 2.4rem;
//   width: 100%;
//   height: 100%;

//   & > * {
//     flex: 1;
//   }
// `;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    staysConfirmed,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  // console.log(bookings);
  // console.log(stays);
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} staysConfirmed={staysConfirmed} />

      <TodayActivity />
      <DurationChart staysConfirmed={staysConfirmed} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
