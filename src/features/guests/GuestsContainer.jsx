/** @format */

import styled from 'styled-components';
import useGuests from './useGuests';
import useDeleteGuest from './useDeleteGuest';
import Spinner from '../../ui/Spinner';
import GuestsTable from './GuestsTable';
import GuestCard from './GuestCard';
import Empty from '../../ui/Empty';

const Container = styled.div`
  width: 100%;
`;

const DesktopView = styled.div`
  display: block;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileView = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
`;

function GuestsContainer() {
  const { guests, isLoading } = useGuests();
  const { deleteGuest, isDeleting } = useDeleteGuest();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (!guests?.length) {
    return <Empty resourceName="guests" />;
  }

  const handleEdit = (guest) => {
    // Add edit functionality here
    console.log('Edit guest:', guest);
  };

  const handleDelete = (guestId) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      deleteGuest(guestId);
    }
  };

  return (
    <Container>
      {/* Desktop Table View */}
      <DesktopView>
        <GuestsTable guests={guests} />
      </DesktopView>

      {/* Mobile/Tablet Cards View */}
      <MobileView>
        <CardsGrid>
          {guests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </CardsGrid>
      </MobileView>
    </Container>
  );
}

export default GuestsContainer;
