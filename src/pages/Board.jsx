import {newSolution} from '../lib/solution.js'
import {newWordRows} from '../lib/board.js'
import {useState, useRef, useEffect} from 'react'
import WordRow from '../components/WordRow.jsx'

function Board() {
  
  // console.log(newWordRows())
  const [solution, setSolution] = useState(newSolution())
  const [wordRows, setWordRows] = useState(newWordRows(solution))
  const [currentRow, setCurrentRow] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const keyDown = (e) => {
    console.log(e.key);
  }
  
  return (
    <div
      className="board center-box"
      tabIndex="0"
      onKeyDown={keyDown}
    >
      <div className="-box">
        <h1>WORDL</h1>
        <div className="-rows">
          {wordRows.map((row) => (
            <WordRow key={row.i} row={row} />
          ))}
        </div>
      </div>
    </div>
  )
}



export default Board