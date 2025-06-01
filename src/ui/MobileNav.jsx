/** @format */

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import {
  HiHomeModern,
  HiIdentification,
  HiMiniSquares2X2,
  HiCalendarDays,
  HiCog6Tooth,
  HiUserCircle,
  HiEllipsisHorizontal,
  HiXMark,
} from 'react-icons/hi2';

// Bottom navigation container
const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  padding: 0.8rem 1rem 2rem 1rem; /* Extra bottom padding for home indicator */

  display: none;

  /* Show on mobile and phablet */
  @media (max-width: 767px) {
    display: block;
  }

  /* Phablet: Enhanced styling */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 1rem 1.5rem 2.5rem 1.5rem;
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      135deg,
      rgba(var(--color-grey-900-rgb), 0.95) 0%,
      rgba(var(--color-grey-800-rgb), 0.9) 100%
    );
    border-top-color: rgba(var(--color-grey-600-rgb), 0.3);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .dark-mode & {
    background: linear-gradient(
      135deg,
      rgba(var(--color-grey-900-rgb), 0.95) 0%,
      rgba(var(--color-grey-800-rgb), 0.9) 100%
    );
    border-top-color: rgba(var(--color-grey-600-rgb), 0.3);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);

    /* Phablet dark mode enhancements */
    @media (min-width: 640px) and (max-width: 767px) {
      box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
  }
`;

const TabList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  /* Phablet: Better spacing */
  @media (min-width: 640px) and (max-width: 767px) {
    gap: 0.8rem;
    justify-content: center;
    max-width: 50rem;
    margin: 0 auto;
  }
`;

const TabItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;

  /* Phablet: Constrain max width */
  @media (min-width: 640px) and (max-width: 767px) {
    flex: none;
    min-width: 8rem;
  }
`;

const StyledTabLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem 0.8rem;
  min-height: 4.8rem;
  min-width: 4.8rem;
  color: var(--color-grey-500);
  text-decoration: none;
  border-radius: var(--border-radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  /* Phablet: Enhanced sizing */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 1.2rem 1rem;
    min-height: 5.2rem;
    min-width: 5.2rem;
    gap: 0.6rem;
  }

  &:hover {
    color: var(--color-brand-600);
    background-color: rgba(var(--color-brand-600-rgb), 0.1);
    transform: translateY(-1px);
  }

  &.active {
    color: var(--color-brand-600);

    &::before {
      content: '';
      position: absolute;
      top: -0.8rem;
      left: 50%;
      transform: translateX(-50%);
      width: 3rem;
      height: 0.3rem;
      background: linear-gradient(
        90deg,
        var(--color-brand-500),
        var(--color-brand-600)
      );
      border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);

      /* Phablet: Enhanced active indicator */
      @media (min-width: 640px) and (max-width: 767px) {
        top: -1rem;
        width: 3.5rem;
        height: 0.4rem;
      }
    }
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));

    /* Phablet: Larger icons */
    @media (min-width: 640px) and (max-width: 767px) {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  &:hover svg,
  &.active svg {
    transform: scale(1.05);
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;

    /* Phablet: Larger text */
    @media (min-width: 640px) and (max-width: 767px) {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }

  &:hover span,
  &.active span {
    font-weight: 600;
  }

  /* Hide labels on very small screens */
  @media (max-width: 380px) {
    span {
      display: none;
    }

    gap: 0;
    min-height: 4rem;
  }
`;

// More button (hamburger menu trigger)
const MoreButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem 0.8rem;
  min-height: 4.8rem;
  min-width: 4.8rem;
  background: none;
  border: none;
  color: var(--color-grey-500);
  border-radius: var(--border-radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  /* Phablet: Enhanced sizing */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 1.2rem 1rem;
    min-height: 5.2rem;
    min-width: 5.2rem;
    gap: 0.6rem;
  }

  &:hover {
    color: var(--color-brand-600);
    background-color: rgba(var(--color-brand-600-rgb), 0.1);
    transform: translateY(-1px);
  }

  /* Active state when menu is open */
  &.active {
    color: var(--color-brand-600);
    background-color: rgba(var(--color-brand-600-rgb), 0.15);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));

    /* Phablet: Larger icons */
    @media (min-width: 640px) and (max-width: 767px) {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  &:hover svg {
    transform: scale(1.05);
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;

    /* Phablet: Larger text */
    @media (min-width: 640px) and (max-width: 767px) {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }

  &:hover span {
    font-weight: 600;
  }

  @media (max-width: 380px) {
    span {
      display: none;
    }

    gap: 0;
    min-height: 4rem;
  }
`;

// Overlay menu for secondary items
const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  /* Phablet: Enhanced backdrop */
  @media (min-width: 640px) and (max-width: 767px) {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
  }
`;

const MenuContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: 2rem;
  transform: translateY(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
  max-height: 50vh;
  overflow-y: auto;

  /* Phablet: Enhanced styling and positioning */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 2.4rem;
    max-width: 85%;
    left: 7.5%;
    right: 7.5%;
    bottom: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.25);
    max-height: 60vh;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);

  /* Phablet: Enhanced spacing */
  @media (min-width: 640px) and (max-width: 767px) {
    margin-bottom: 2.4rem;
    padding-bottom: 1.2rem;
  }
`;

const MenuTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin: 0;

  /* Phablet: Larger title */
  @media (min-width: 640px) and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: var(--color-grey-100);
  border: none;
  border-radius: 50%;
  color: var(--color-grey-600);
  cursor: pointer;
  transition: all 0.3s ease;

  /* Phablet: Larger close button */
  @media (min-width: 640px) and (max-width: 767px) {
    width: 4.4rem;
    height: 4.4rem;
  }

  &:hover {
    background: var(--color-grey-200);
    color: var(--color-grey-800);
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  svg {
    width: 2rem;
    height: 2rem;

    /* Phablet: Larger icon */
    @media (min-width: 640px) and (max-width: 767px) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  /* Phablet: Enhanced spacing */
  @media (min-width: 640px) and (max-width: 767px) {
    gap: 1rem;
  }
`;

const MenuNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.6rem 2rem;
  color: var(--color-grey-600);
  text-decoration: none;
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
  background: var(--color-grey-50);
  min-height: 5.6rem;

  /* Phablet: Enhanced styling */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 1.8rem 2.4rem;
    gap: 1.6rem;
    min-height: 6rem;
    border-radius: var(--border-radius-lg);
  }

  &:hover {
    color: var(--color-brand-600);
    background: var(--color-brand-50);
    transform: translateY(-1px);

    /* Phablet: Enhanced hover effect */
    @media (min-width: 640px) and (max-width: 767px) {
      box-shadow: 0 4px 12px rgba(var(--color-brand-600-rgb), 0.15);
    }
  }

  &.active {
    color: var(--color-brand-600);
    background: var(--color-brand-100);
    border-left: 4px solid var(--color-brand-600);
    font-weight: 600;
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: inherit;
    transition: all 0.3s ease;

    /* Phablet: Larger icons */
    @media (min-width: 640px) and (max-width: 767px) {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  &:hover svg {
    transform: scale(1.05);
  }

  span {
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.3s ease;

    /* Phablet: Larger text */
    @media (min-width: 640px) and (max-width: 767px) {
      font-size: 1.7rem;
    }
  }

  &:hover span,
  &.active span {
    font-weight: 600;
  }
`;

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryNavItems = [
    { to: '/dashboard', icon: HiMiniSquares2X2, label: 'Dashboard' },
    { to: '/bookings', icon: HiCalendarDays, label: 'Bookings' },
    { to: '/guests', icon: HiIdentification, label: 'Guests' },
    { to: '/cabins', icon: HiHomeModern, label: 'Cabins' },
  ];

  const secondaryNavItems = [
    { to: '/users', icon: HiUserCircle, label: 'Users' },
    { to: '/settings', icon: HiCog6Tooth, label: 'Settings' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  // Close menu on escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleMenuClose();
    }
  };

  return (
    <>
      {/* Bottom Tab Navigation */}
      <BottomNavContainer>
        <TabList>
          {primaryNavItems.map(({ to, icon: Icon, label }) => (
            <TabItem key={to}>
              <StyledTabLink to={to}>
                <Icon />
                <span>{label}</span>
              </StyledTabLink>
            </TabItem>
          ))}

          {/* More button */}
          <TabItem>
            <MoreButton
              onClick={handleMenuToggle}
              className={isMenuOpen ? 'active' : ''}
              aria-label="More navigation options"
              aria-expanded={isMenuOpen}
            >
              <HiEllipsisHorizontal />
              <span>More</span>
            </MoreButton>
          </TabItem>
        </TabList>
      </BottomNavContainer>

      {/* Overlay Menu for Secondary Items */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <MenuContent isOpen={isMenuOpen}>
          <MenuHeader>
            <MenuTitle>More Options</MenuTitle>
            <CloseButton onClick={handleMenuClose} aria-label="Close menu">
              <HiXMark />
            </CloseButton>
          </MenuHeader>

          <MenuList>
            {secondaryNavItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <MenuNavLink to={to} onClick={handleMenuClose}>
                  <Icon />
                  <span>{label}</span>
                </MenuNavLink>
              </li>
            ))}
          </MenuList>
        </MenuContent>
      </MenuOverlay>
    </>
  );
}

export default MobileNav;
