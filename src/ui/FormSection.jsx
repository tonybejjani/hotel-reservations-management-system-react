/** @format */

import styled from 'styled-components';
import Heading from './Heading';

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  row-gap: 1rem;
  padding: 1.6rem;
  margin-bottom: 3.2rem;
`;

function FormSection({ children, title, addActionBtns }) {
  return (
    <>
      <StyledFormSection>{children}</StyledFormSection>
    </>
  );
}

export default FormSection;
