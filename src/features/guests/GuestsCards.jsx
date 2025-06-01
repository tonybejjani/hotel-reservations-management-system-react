/** @format */

import styled from 'styled-components';
import GuestCard from './GuestCard';
import Menus from '../../ui/Menus';
import ResponsivePagination from '../../ui/ResponsivePagination';
import FloatingPagination from '../../ui/FloatingPagination';

const CardsGrid = styled.div`
  display: grid;
  gap: 2rem;
  /* Add bottom padding to account for floating pagination */
  padding-bottom: 8rem;

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 0; /* No floating pagination on tablet */
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`;

function GuestsCards({ guests = [], count = 0 }) {
  return (
    <>
      <Menus>
        <CardsGrid>
          {guests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </CardsGrid>
      </Menus>

      {/* Desktop/Tablet pagination */}
      <ResponsivePagination count={count} />

      {/* Mobile floating pagination */}
      <FloatingPagination count={count} />
    </>
  );
}

export default GuestsCards;
