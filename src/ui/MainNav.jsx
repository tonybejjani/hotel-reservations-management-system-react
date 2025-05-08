/** @format */

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  // HiIdentification,
  // HiMiniSquares2X2,
  // HiOutlineCalendarDays,
  // HiOutlineCog6Tooth,
  // HiOutlineHome,
  HiHomeModern,
  HiIdentification,
  HiMiniSquares2X2,
  HiCalendarDays,
  HiCog6Tooth,
  HiUserCircle,
  // HiOutlineUsers,
} from 'react-icons/hi2';
// import { HiOutlineUser, HiOutlineUserCircle } from 'react-icons/hi';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  & span {
    font-size: 1.2rem;
    font-weight: 200;
  }
`;

function MainNav() {
  return (
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
  );
}

export default MainNav;
