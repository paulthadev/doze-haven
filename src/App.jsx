import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Button } from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Doze Haven</H1>

        <Button onClick={() => alert("Right Clicked")}>Right</Button>
        <Button onClick={() => alert("Left Clicked")}>Left</Button>

        <Input placeholder="Number of guest" />
        <Input placeholder="Number of guest" />
      </StyledApp>
    </>
  );
}

export default App;
