import './sass/app.scss';
import Board from './pages/Board.jsx'
import { ToastContainer } from 'react-toastify'
import { WordProvider } from './context/word/WordContext'

function App() {
  return (
    <>
      <WordProvider>
        <Board />
      </WordProvider>
      <ToastContainer />
    </>
  );
}

export default App;
