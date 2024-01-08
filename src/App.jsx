import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Doze Haven</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("checked in")}>Check In</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("checked out")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>

            <form>
              <Input placeholder="Number of guest" />
              <Input placeholder="Number of guest" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
