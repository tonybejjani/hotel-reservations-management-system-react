/** @format */

import styled from 'styled-components';
import { HiPencil, HiTrash } from 'react-icons/hi2';

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const GuestName = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 0.4rem;
`;

const GuestId = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  font-weight: 500;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &.edit svg {
    color: var(--color-blue-700);
  }

  &.delete svg {
    color: var(--color-red-700);
  }
`;

const CardInfo = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const InfoValue = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-800);
  font-weight: 500;
`;

const CountryFlag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  img {
    width: 2rem;
    height: auto;
    border-radius: 2px;
  }
`;

function GuestCard({ guest, onEdit, onDelete }) {
  const { id, fullName, email, nationalID, nationality, countryFlag } = guest;

  return (
    <Card>
      <CardHeader>
        <div>
          <GuestName>{fullName}</GuestName>
          <GuestId>ID: {id}</GuestId>
        </div>
        <CardActions>
          <ActionButton className="edit" onClick={() => onEdit(guest)}>
            <HiPencil />
          </ActionButton>
          <ActionButton className="delete" onClick={() => onDelete(id)}>
            <HiTrash />
          </ActionButton>
        </CardActions>
      </CardHeader>

      <CardInfo>
        <InfoRow>
          <InfoLabel>Email</InfoLabel>
          <InfoValue>{email}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>National ID</InfoLabel>
          <InfoValue>{nationalID}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Nationality</InfoLabel>
          <InfoValue>
            <CountryFlag>
              <img src={countryFlag} alt={`${nationality} flag`} />
              {nationality}
            </CountryFlag>
          </InfoValue>
        </InfoRow>
      </CardInfo>
    </Card>
  );
}

export default GuestCard;
