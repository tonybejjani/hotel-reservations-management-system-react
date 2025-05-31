/** @format */

import styled from 'styled-components';
import { useState } from 'react';

const AvatarButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  /* border: 2px solid var(--color-brand-600); */
  padding: 0;
  background: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  min-width: 4rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--color-brand-700);
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(var(--color-brand-600), 0.3);
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

function Avatar({
  src,
  alt,
  fallbackText = 'User',
  status,
  size = 'medium',
  onClick,
  className,
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    if (!name) return 'U';

    // Split by space and get first letter of each word
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].slice(0, 2).toUpperCase();
    }

    // Take first letter of first and last name
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <AvatarButton
      onClick={onClick}
      className={className}
      aria-label={alt || `${fallbackText}'s profile`}
      {...props}
    >
      {src && !imageError ? (
        <AvatarImage
          src={src}
          alt={alt || `${fallbackText} avatar`}
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback>{getInitials(fallbackText)}</AvatarFallback>
      )}
    </AvatarButton>
  );
}

export default Avatar;
