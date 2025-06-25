/** @format */

import styled from 'styled-components';
import { useState } from 'react';
import Heading from '../ui/Heading';
import GuestsContainer from '../features/guests/GuestsContainer';
import AddGuest from '../features/guests/AddGuest';
import GuestsSearchBar from '../features/guests/GuestsSearchBar';
import MobileAddButton from '../ui/MobileAddButton';

const StyledGuests = styled.div`
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 1.6rem;

  /* Desktop: Single row with search + action */
  @media (min-width: 1025px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  /* Tablet: Two rows for better spacing */
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  /* Mobile: Minimal header */
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* Desktop: Title + Actions */
  @media (min-width: 1025px) {
    /* Actions handled by HeaderActions on desktop */
  }

  /* Tablet: Title + Add button */
  @media (min-width: 768px) and (max-width: 1024px) {
    /* Add button shown here on tablet */
  }

  /* Mobile: Title only */
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  /* Desktop: Show search + add button */
  @media (min-width: 1025px) {
    flex-shrink: 0;
  }

  /* Tablet: Hide this - add button shown in TitleRow instead */
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }

  /* Mobile: Hide traditional actions */
  @media (max-width: 767px) {
    display: none;
  }
`;

const TabletActions = styled.div`
  /* Only show add button on tablet in title row */
  display: none;

  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
  }
`;

const SearchRow = styled.div`
  /* Only show on tablet */
  display: none;

  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
    width: 100%;
  }
`;

function Guests() {
  return (
    <StyledGuests>
      <PageHeader>
        <TitleRow>
          <Heading as="h1">All guests</Heading>

          {/* Tablet: Add button in title row */}
          <TabletActions>
            <AddGuest />
          </TabletActions>
        </TitleRow>

        {/* Desktop: Search + Add button */}
        <HeaderActions>
          <GuestsSearchBar />
          <AddGuest />
        </HeaderActions>

        {/* Tablet: Full-width search row */}
        <SearchRow>
          <GuestsSearchBar expanded />
        </SearchRow>
      </PageHeader>

      {/* Mobile: Sticky search bar */}
      <GuestsSearchBar mobile />

      <GuestsContainer />

      {/* Mobile: Floating Action Button */}
      <MobileAddButton />
    </StyledGuests>
  );
}

export default Guests;
