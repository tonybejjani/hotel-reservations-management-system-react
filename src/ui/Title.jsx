/** @format */

import styled from 'styled-components';

export const StyledTitle = styled.div`
  border-bottom: solid 3px var(--color-grey-100);
  margin-bottom: 1.6rem;
  padding-bottom: 0.4rem;
  text-transform: capitalize;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

export default Title;
