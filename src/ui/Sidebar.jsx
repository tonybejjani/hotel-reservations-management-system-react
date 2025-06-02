/** @format */

import styled from 'styled-components';
import MainNav from './MainNav';
import Logo from './Logo';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.6rem 0;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  transition: width 0.3s ease;

  & :first-child(img) {
    scale: 2;
  }

  /* Desktop: Full width */
  @media (min-width: 1200px) {
    width: 26rem;
    padding-top: 6.4rem;
  }

  /* Tablet/Small Laptop: Icon-only width */
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 7rem;
    padding: 1.6rem 0.8rem;
    gap: 2.4rem;

    & :first-child(img) {
      scale: 1.2;
    }
  }

  /* Hide on mobile - MobileHeader takes over */
  @media (max-width: 767px) {
    display: none;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <Logo type="short" />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
