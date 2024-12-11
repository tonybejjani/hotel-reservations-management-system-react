/** @format */

import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 2.4rem;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello world!</H1>
        <Button onClick={() => alert('clicked!')}>Check in</Button>
        <Button>Check out</Button>
        <Input placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
