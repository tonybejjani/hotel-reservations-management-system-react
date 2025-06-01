/** @format */

import styled from 'styled-components';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import CreateGuestForm from './CreateGuestForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteGuest from './useDeleteGuest';

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

function GuestCard({ guest }) {
  const { deleteGuest, isDeleting } = useDeleteGuest();
  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;

  return (
    <Card>
      <CardHeader>
        <div>
          <GuestName>{fullName}</GuestName>
        </div>
        <CardActions>
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={guestId} />

                <Menus.List id={guestId}>
                  <Modal.Open opens="guestForm">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="delete-form">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window opens="guestForm" title="edit guest ">
                  <CreateGuestForm guestToEdit={guest} />
                </Modal.Window>

                <Modal.Window opens="delete-form">
                  <ConfirmDelete
                    resourceName={`Guest ` + fullName}
                    disabled={isDeleting}
                    onConfirm={() => deleteGuest(guestId)}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </div>
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
