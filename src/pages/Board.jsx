import { nAcross, nDown } from '../lib/board.js'
import { useRef, useEffect, useContext } from 'react'
import WordRow from '../components/WordRow.jsx'
import WordContext from '../context/word/WordContext.js'

function Board() {
  const { targetWord, wordRows, currentY, setCurrentY,  currentX, setCurrentX } = useContext(WordContext)
  
  const boardRef = useRef()
  useEffect(()=>{
    boardRef.current.focus()
  })
  const keyDown = (e) => {
    const wordRow = wordRows.find(wordRow => wordRow.i === currentY);
    const box = wordRow.boxes.find(box => box.i === currentX);
    if (e.key === 'Backspace') {
      setCurrentX(currentX => {
        return (currentX > 0)
          ? currentX - 1
          : 0
      })
      box.val = ''
      return
    }
    if (e.keyCode < 65 || e.keyCode > 90 || e.ctrlKey || e.metaKey) {
      return false
    }
    box.val = e.key.toUpperCase();
    // setWordRows((wordRows) => {
    //   return wordRows
    // })
    setCurrentX(currentX => {
      let nextX = currentX + 1;
      if (nextX === nAcross) {
        const check = targetWord.evaluate(wordRow.str());
        console.log('check ******', check)
        if (check.inWordList) {
          wordRow.showResult(check.result)
          if (check.win) {
            /* todo */
            setCurrentY(7)
            setCurrentX(6)
          }
        } else {
          return 4
        }
        if (currentY < nDown - 1) {
          setCurrentY(currentY => currentY + 1)
        }
        return 0;
      }
      return nextX
    })
  }
  
  const clickRowBox = (row, box) => {
    console.log('row', row.i, 'box', box.i);
    setCurrentY(row.i)
    setCurrentX(box.i)
  }

  return (
    <div
      className="board center-box"
      tabIndex="0"
      onKeyDown={keyDown}
      ref={boardRef}
    >
      <div className="-box">
        <h1>WORDL</h1>
        <div className="-rows">
          {wordRows.map((row) => (
            <WordRow
              key={row.i}
              row={row}
              currentY={currentY}
              currentX={currentX}
              clickRowBox={clickRowBox}
            />
          ))}
        </div>
      </div>
    </div>
  )
}



export default Board