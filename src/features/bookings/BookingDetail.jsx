/** @format */

import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useBooking } from './useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';

import { useCheckout } from '../check-in-out/useCheckout';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import useDeleteBooking from './useDeleteBooking';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, isFetching, booking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  const { status, id } = booking;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading || isFetching) return <Spinner />;

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === 'unconfirmed' && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
          )}
          {status === 'checked-in' && (
            <Button
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
              onClick={() => checkout(id)}
            >
              Check out
            </Button>
          )}
          <Modal.Open opens="delete-form">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Window name="delete" opens="delete-form">
            <ConfirmDelete
              resourceName={`Booking #` + id}
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(id, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
