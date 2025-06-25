/** @format */

import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';
import useCabins from '../cabins/useCabins';
import styled from 'styled-components';

const StatLayout = styled.div`
  display: contents;

  @media all and (display-mode: standalone) {
  }

  /* Phablet: Slightly taller header */
  @media (max-width: 1024px) {
    display: grid;
    gap: 2.4rem;
    grid-template-columns: 1fr 1fr;
  }

  /* Mobile first - start with 320px base */
  @media (max-width: 420px) {
    grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  }
`;

function Stats({ staysConfirmed, bookings }) {
  const { cabins, isLoading } = useCabins();

  const [getSearchParams] = useSearchParams();

  const numDays = !getSearchParams.get('last')
    ? 7
    : Number(getSearchParams.get('last'));

  const totalBookings = bookings ? bookings.reduce((acc) => acc + 1, 0) : 0;

  const totalSales = bookings
    ? bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
    : 0;

  const totalCheckins = staysConfirmed
    ? staysConfirmed.reduce((acc) => acc + 1, 0)
    : 0;

  const occupations = staysConfirmed.reduce(
    (acc, stays) => acc + stays.numNights,
    0
  );

  const totalNights = !isLoading ? cabins.length * numDays : 0;

  const occupancyRate = (occupations / totalNights) * 100;

  return (
    <StatLayout>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="bookings"
        value={totalBookings}
      ></Stat>

      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        title="sales"
        value={formatCurrency(totalSales)}
      ></Stat>
      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="check ins"
        value={totalCheckins}
      ></Stat>
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="occupancy rate"
        value={`${Math.round(occupancyRate)} %`}
      ></Stat>
    </StatLayout>
  );
}

export default Stats;
