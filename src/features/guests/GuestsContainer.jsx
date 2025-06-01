/** @format */

import styled from 'styled-components';
import useGuests from './useGuests';
import GuestsCards from './GuestsCards';

import Spinner from '../../ui/Spinner';
import GuestsTable from './GuestsTable';
import Empty from '../../ui/Empty';

const Container = styled.div`
  width: 100%;
  padding: 2.4rem 0;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
`;
function GuestsContainer() {
  const { guests, isLoading, count } = useGuests();

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

  return (
    <Container>
      {/* Desktop Table View */}
      <DesktopView>
        <GuestsTable guests={guests} />
      </DesktopView>

      {/* Mobile/Tablet Cards View */}
      <MobileView>
        <GuestsCards guests={guests} count={count} />
      </MobileView>
    </Container>
  );
}

export default GuestsContainer;
