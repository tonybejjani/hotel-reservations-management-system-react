/** @format */

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderMobile from './Header';
import MobileNav from './MobileNav';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  /* Desktop: Full sidebar */
  @media (min-width: 1200px) {
    grid-template-columns: 26rem 1fr;
  }

  /* Tablet/Small Laptop: Icon-only sidebar */
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: 7rem 1fr;
  }

  /* Mobile/Phablet: No sidebar */
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5.6rem 1fr;
  }

  /* Phablet: Slightly taller header */
  @media (min-width: 640px) and (max-width: 767px) {
    grid-template-rows: 6rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 768px) {
    padding: 2rem 2.4rem 3.2rem;
  }

  /* Mobile: Bottom padding for navigation */
  @media (max-width: 639px) {
    padding: 2rem 1.6rem 9rem 1.6rem;
  }

  /* Phablet: Enhanced bottom padding for larger nav */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 2.4rem 2rem 10rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  /* Phablet: Slightly smaller gap */
  @media (min-width: 640px) and (max-width: 767px) {
    gap: 2.8rem;
  }

  /* Mobile: Smaller gap */
  @media (max-width: 639px) {
    gap: 2.4rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <HeaderMobile />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <MobileNav />
    </StyledAppLayout>
  );
}

export default AppLayout;
