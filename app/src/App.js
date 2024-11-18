import logo from './logo.svg';
import Metronome from './components/Metronome/Metronome';
import './App.css';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>Metronome</h1>

      <Metronome />
      <body1>
        <i>"If you're not practicing with a metronome, what are you doing?"</i>
        <br />
        - Every bad bass teacher
      </body1>
      <br /> <br />
    </Container>
  );
}

export default App;
