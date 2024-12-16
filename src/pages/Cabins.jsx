/** @format */

import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://jroqiytbtljjznebyltj.supabase.co/storage/v1/object/public/cabin-images/0.03399913173463864-cabin-002.jpg" />
    </Row>
  );
}

export default Cabins;
