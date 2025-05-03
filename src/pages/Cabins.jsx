/** @format */

// import { useEffect } from 'react';
// import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';

import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  {
    /* <img src="https://jroqiytbtljjznebyltj.supabase.co/storage/v1/object/public/cabin-images/0.03399913173463864-cabin-002.jpg" /> */
  }

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Cabins</Heading>

        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
