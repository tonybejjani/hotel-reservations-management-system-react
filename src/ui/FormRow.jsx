/**

 * @format
 */

/** @format */

import styled, { css } from 'styled-components';
import Error from '../ui/Error';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  /* &:first-child {
      padding-top: 0;
    } */

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  ${(props) =>
    props.type === 'datePicker' &&
    css`
      display: grid !important;
      gap: 2.4rem !important;

      /* gap: 2.4rem !important; */
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

function FormRow({ label, error, id, children, type }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
