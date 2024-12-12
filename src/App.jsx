/** @format */

import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/heading';

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">Escape</Heading>

        <Heading as="h2">Check In & out</Heading>
        <Button onClick={() => alert('clicked!')}>Check in</Button>
        <Button>Check out</Button>

        <Heading as="h3">Form</Heading>
        <Input placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
