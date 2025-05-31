/** @format */

import styled from 'styled-components';
import { useState } from 'react';
import Logo from './Logo';
import Avatar from './Avatar';
import UserMenu from './UserMenu';
import { useUser } from '../features/authentication/useUser';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1rem 1.6rem 1rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  display: none;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 5.6rem;
  transition: all 0.3s ease;

  @media (max-width: 639px) {
    display: flex;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  scale: 0.8;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { fullName, avatar } = user.user_metadata;

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log(user);
  return (
    <>
      <StyledHeader>
        <LogoContainer>
          <Logo logoType="long" />
        </LogoContainer>

        <AvatarContainer>
          <Avatar
            src={avatar}
            fallbackText={fullName}
            onClick={handleAvatarClick}
            aria-label="User menu"
            hasNotification={true} // Show red dot for notifications
          />
        </AvatarContainer>
      </StyledHeader>

      <UserMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
      />
    </>
  );
}

export default Header;
