/** @format */

import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import {
  HiUser,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiSun,
  HiMoon,
  HiBell,
  HiLifebuoy,
} from 'react-icons/hi2';
import { useDarkMode } from '../context/DarkModeContext';
import Avatar from './Avatar';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  /* Hide on desktop */
  @media (min-width: 640px) {
    display: none;
  }
`;

const MenuContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  transform: translateY(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  padding: 2rem 0 3rem 0;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
  max-height: 70vh;
  overflow-y: auto;
`;

const UserInfo = styled.div`
  padding: 1.2rem 2rem 2rem 2rem;
  border-bottom: 1px solid var(--color-grey-200);
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 0.4rem;
`;

const UserEmail = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 0;
`;

const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 2rem;
  background: none;
  border: none;
  color: var(--color-grey-700);
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  min-height: 5.6rem;

  &:hover {
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  }

  &:focus {
    outline: none;
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
    transition: color 0.3s ease;
  }

  &:hover svg,
  &:focus svg {
    color: var(--color-brand-600);
  }

  &.logout {
    color: var(--color-red-700);
    border-top: 1px solid var(--color-grey-200);
    margin-top: 1.2rem;

    svg {
      color: var(--color-red-700);
    }

    &:hover {
      background-color: var(--color-red-50);
      color: var(--color-red-800);
    }
  }

  &.theme-active {
    color: var(--color-brand-700);

    svg {
      color: var(--color-brand-600);
    }
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ToggleSwitch = styled.button`
  width: 5.2rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  border: none;
  background: ${(props) =>
    props.isDark ? 'var(--color-brand-600)' : 'var(--color-grey-300)'};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0.2rem;

  &::after {
    content: '';
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: white;
    position: absolute;
    transition: transform 0.3s ease;
    transform: translateX(${(props) => (props.isDark ? '2.4rem' : '0')});
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationBadge = styled.span`
  background-color: var(--color-red-700);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  margin-left: auto;
`;

function UserMenu({ isOpen, onClose, user }) {
  const menuRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { fullName } = user.identities[0].identity_data;
  const email = user.email;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleMenuAction = (action) => {
    onClose();
    console.log(`Action: ${action}`);
    // Add navigation logic here
  };

  const handleLogout = () => {
    onClose();
    console.log('Logging out...');
    // Add logout logic here
  };

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />

      <MenuContent isOpen={isOpen} ref={menuRef}>
        <UserInfo>
          <Avatar src={user.avatar} fallbackText={fullName} size="large" />
          <UserDetails>
            <UserName>{fullName}</UserName>
            <UserEmail>{email}</UserEmail>
          </UserDetails>
        </UserInfo>

        <MenuList>
          <MenuItem>
            <MenuButton onClick={() => handleMenuAction('profile')}>
              <HiUser />
              Account Settings
            </MenuButton>
          </MenuItem>

          {/* <MenuItem>
            <MenuButton onClick={() => handleMenuAction('notifications')}>
              <HiBell />
              Notifications
              <NotificationBadge>3</NotificationBadge>
            </MenuButton>
          </MenuItem> */}

          <MenuItem>
            <MenuButton as="div" className={isDarkMode ? 'theme-active' : ''}>
              <ThemeToggle>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.6rem',
                  }}
                >
                  {isDarkMode ? <HiMoon /> : <HiSun />}
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </div>
                <ToggleSwitch
                  isDark={isDarkMode}
                  onClick={handleThemeToggle}
                  aria-label="Toggle theme"
                />
              </ThemeToggle>
            </MenuButton>
          </MenuItem>

          {/* <MenuItem>
            <MenuButton onClick={() => handleMenuAction('settings')}>
              <HiCog6Tooth />
              App Settings
            </MenuButton>
          </MenuItem> */}

          {/* <MenuItem>
            <MenuButton onClick={() => handleMenuAction('help')}>
              <HiLifebuoy />
              Help & Support
            </MenuButton>
          </MenuItem> */}

          <MenuItem>
            <MenuButton className="logout" onClick={handleLogout}>
              <HiArrowRightOnRectangle />
              Logout
            </MenuButton>
          </MenuItem>
        </MenuList>
      </MenuContent>
    </>
  );
}

export default UserMenu;
