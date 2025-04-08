import styled from "styled-components";
import Board from "./components/Board/Board";

function App() {

  return (
    <AppContainer>
      <Board />
    </AppContainer>
  )
}

const AppContainer = styled.div`
margin-inline: auto;
  padding: 24px;
  width: min(100%, 1440px);
  height: 100vh;
`;

export default App;
