/** @format */

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MainNav from './MainNav'; // Add this import
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  /* Tablet: Hide sidebar */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  /* Mobile: Show header + content */
  @media (max-width: 639px) {
    grid-template-rows: 5.6rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 768px) {
    padding: 2rem 2.4rem 3.2rem;
  }

  /* Mobile: Add top margin for header + bottom padding for nav */
  @media (max-width: 639px) {
    padding: 2rem 1.6rem 10rem 1.6rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

// Mobile navigation container
const MobileNav = styled.div`
  display: none;

  @media (max-width: 639px) {
    display: block;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      {/* Mobile bottom navigation */}
      <MobileNav>
        <MainNav />
      </MobileNav>
    </StyledAppLayout>
  );
}

export default AppLayout;
