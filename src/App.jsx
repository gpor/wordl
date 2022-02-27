import './sass/app.scss';
import Board from './pages/Board.jsx'

import { WordProvider } from './context/word/WordContext'

function App() {
  return (
    <WordProvider>
      <Board />
    </WordProvider>
  );
}

export default App;
