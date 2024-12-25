/** @format */

// import { useEffect } from 'react';
// import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';

function Cabins() {
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        {/* <img src="https://jroqiytbtljjznebyltj.supabase.co/storage/v1/object/public/cabin-images/0.03399913173463864-cabin-002.jpg" /> */}
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
