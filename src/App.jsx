/** @format */

import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">Escape</Heading>
            <div>
              <Heading as="h2">Check In & out</Heading>
              <Button
                size="small"
                variation="primary"
                onClick={() => alert('clicked!')}
              >
                Check in
              </Button>
              <Button size="small" variation="primary">
                Check out
              </Button>
            </div>
          </Row>
          <Row>
            <form>
              <Heading as="h3">Form</Heading>
              <Input placeholder="Number of guests" />
              <Input placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
