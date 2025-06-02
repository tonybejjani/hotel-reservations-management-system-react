/** @format */

import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiHomeModern,
  HiIdentification,
  HiMiniSquares2X2,
  HiCalendarDays,
  HiCog6Tooth,
  HiUserCircle,
  HiOutlineUser,
} from 'react-icons/hi2';
import UserAvatar from '../features/authentication/UserAvatar';
import Logout from '../features/authentication/Logout';
import DarkModeToggle from './DarkModeToggle';
import ButtonIcon from './ButtonIcon';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 10rem;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;

  /* Tablet/Small Laptop: Tighter spacing */
  @media (min-width: 768px) and (max-width: 1199px) {
    gap: 0.8rem;
  }
`;

const UserNavList = styled(NavList)`
  display: none;

  /* Tablet/Small Laptop: display true */
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 0.8rem;
    color: var(--color-grey-500);
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    text-decoration: none;
    align-items: center;
    position: relative;

    /* Tablet/Small Laptop: Icon-only styling */
    @media (min-width: 768px) and (max-width: 1199px) {
      padding: 1.2rem;
      justify-content: center;
      gap: 0;
    }
  }

  /* Keep exact same hover/active states */
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

    /* Hide text on tablet/small laptop */
    @media (min-width: 768px) and (max-width: 1199px) {
      display: none;
    }
  }

  /* Tooltip for icon-only mode */
  &::after {
    content: attr(data-label);
    position: absolute;
    left: 6rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-grey-900);
    color: white;
    padding: 0.6rem 1rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 1000;

    /* Show tooltip only on tablet/small laptop hover */
    @media (min-width: 768px) and (max-width: 1199px) {
      /* Tooltip will show on hover */
    }

    /* Hide on desktop */
    @media (min-width: 1200px) {
      display: none;
    }
  }

  /* Show tooltip on hover for tablet/small laptop */
  @media (min-width: 768px) and (max-width: 1199px) {
    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledHeaderMenu = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

function MainNav() {
  const navigate = useNavigate();
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" data-label="Dashboard">
            <HiMiniSquares2X2 />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings" data-label="Bookings">
            <HiCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/guests" data-label="Guests">
            <HiIdentification />
            <span>Guests</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins" data-label="Cabins">
            <HiHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users" data-label="Users">
            <HiUserCircle />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" data-label="Settings">
            <HiCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
      <UserNavList type="tablet">
        <li>
          <StyledNavLink to="/account" data-label="User Account">
            <HiOutlineUser />
          </StyledNavLink>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <Logout />
        </li>
        <li>
          <StyledHeaderMenu>
            <UserAvatar tabletView={true} />
          </StyledHeaderMenu>
        </li>
      </UserNavList>
    </Nav>
  );
}

export default MainNav;
