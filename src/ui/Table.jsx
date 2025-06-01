/** @format */

import { createContext, useContext } from 'react';
import styled from 'styled-components';

export const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

export const StyledHeaderMobile = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

export const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: ${(props) =>
      props.ishoverable === 'true' ? 'var(--color-grey-100)' : 'inherit'};

    cursor: ${(props) =>
      props.ishoverable === 'true' ? 'pointer' : 'inherit'};
  }
`;

export const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

export const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

export const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

export const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function HeaderMobile({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeaderMobile role="row" columns={columns} as="HeaderMobile">
      {children}
    </StyledHeaderMobile>
  );
}

function Row({ children, ishoverable = 'false', rowData = {}, onSetRowData }) {
  const { columns } = useContext(TableContext);

  function handleRowData(rowData) {
    if (ishoverable === 'false') return;
    onSetRowData(rowData);
  }
  return (
    <StyledRow
      role="row"
      columns={columns}
      ishoverable={ishoverable}
      onClick={() => handleRowData(rowData)}
    >
      {children}
    </StyledRow>
  );
}

function Body({ render, data }) {
  if (data.length === 0)
    return <Empty>No Cabins to be shown at the moment.</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.HeaderMobile = HeaderMobile;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
