/** @format */

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiHomeModern,
  HiIdentification,
  HiMiniSquares2X2,
  HiCalendarDays,
  HiCog6Tooth,
  HiUserCircle,
} from 'react-icons/hi2';
import MobileNav from './MobileNav';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 0.8rem;
    color: var(--color-grey-500);
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-700);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  & span {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

function MainNav() {
  return (
    <>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/dashboard">
              <HiMiniSquares2X2 />
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/bookings">
              <HiCalendarDays />
              <span>Bookings</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/guests">
              <HiIdentification />
              <span>Guests</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/cabins">
              <HiHomeModern />
              <span>Cabins</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">
              <HiUserCircle />
              <span>Users</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings">
              <HiCog6Tooth />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </>
  );
}

export default MainNav;
