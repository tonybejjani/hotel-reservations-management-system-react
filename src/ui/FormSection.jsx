/** @format */

import styled from 'styled-components';
import Heading from './Heading';

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  row-gap: 1rem;
  border: solid 1px var(--color-grey-100);
  padding: 2rem;
`;

function FormSection({ children, title, addActionBtns }) {
  return (
    <>
      <StyledFormSection>{children}</StyledFormSection>
    </>
  );
}

export default FormSection;
