/** @format */

import styled from 'styled-components';
import GuestCard from './GuestCard';
import Pagination from '../../ui/Pagination';
import Menus from '../../ui/Menus';
const CardsGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
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
      <PaginationContainer>
        <Pagination count={count} />
      </PaginationContainer>
      ;
    </>
  );
}

export default GuestsCards;
