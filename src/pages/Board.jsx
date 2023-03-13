import { nAcross, nDown } from '../lib/board.js'
import { useRef, useEffect, useContext } from 'react'
import WordRow from '../components/WordRow.jsx'
import WordContext from '../context/word/WordContext.js'

function Board() {
  const {
      keyboard,
      targetWord,
      wordRows,
      setWordRows,
      currentX,
      currentY,
      setCurrentX,
      setCurrentY,
      letterChoices,
      setLetterChoices,
      disableKeys,
      setDisableKeys,

    } = useContext(WordContext),
    boardRef = useRef(),
    keyClick = (value) => {
      const wordRow = wordRows.find(wordRow => wordRow.i === currentY);
      const box = wordRow.boxes.find(box => box.i === currentX);
      if (value === 'delete') {
        setCurrentX(currentX => {
          return (currentX > 0)
            ? currentX - 1
            : 0
        })
        if (currentX < 5) {
          box.val = ''
        }
        if (currentX > 0) wordRow.boxes[currentX - 1].val = '|'
        return
      }
      if (value !== 'enter' && value !== 'delete') {
        box.val = value
      }
      if (value === 'enter') {
        if (currentX === nAcross) {
          const check = targetWord.evaluate(wordRow.str())
          // console.log('check ******', check)
          if (check.inWordList) {
            wordRow.showResult(check.result)
            if (check.win) {
              setCurrentY(7)
              setCurrentX(6)
              setDisableKeys(true)
              //ToDo: show win toast
            }
            // valid word, not the key word
            // Add the letter val and css class values to the letterChoice Array
            const usersSelectedLetters = wordRows[currentY].boxes.map(box => ({resultClass: box.resultClass, val: box.val}))
            setLetterChoices(currentLetterChoices => (
              [
                ...currentLetterChoices,
                ...usersSelectedLetters,
              ]
            ))
            setCurrentY(currentY => currentY + 1)
            setCurrentX(0)
          } else {
            shakeRow()
            console.log('At end of row and clicked enter')
            setCurrentX(4) // not a valid word, send cursor to end of row
            alert('That word is not in the list...') // todo: add an toast
          }
          //ToDo: check for last row (currentY) and show the wordle, show user lost toast
          console.log({currentY,nDown})
          if (currentY === nDown - 1) {
            // alert('You lose looser!')
          }
        } else {
          shakeRow()
          console.log('Not at end of row and clicked enter')
        }
      } else {
        setCurrentX(currentX => {
          return currentX + 1
        })
      }
    },
    shakeRow = () =>{
      setWordRows(currentWordRows => {
        currentWordRows[currentY].rowClass = 'shake'
        return [
          ...currentWordRows,
        ]
      })
      setTimeout(()=>{
        setWordRows(currentWordRows => {
          currentWordRows[currentY].rowClass = ''
          return [
            ...currentWordRows,
          ]
        })
      }, 900)
    },
    getKeyResultClass = (keyName) => {
      let className = ''
      letterChoices.forEach(letterChoice => {
        if (letterChoice.val === keyName) {
          className = letterChoice.resultClass
        }
      })
      return className
    }
  useEffect(()=>{
    boardRef.current.focus()
  })
  return (
    <>
      <div
        className="board center-box"
        ref={boardRef}
      >
        <div className="-box">
          <h1>WORDL</h1>
          <div className="-rows">
            {wordRows.map((row, index) => (
              <WordRow
                key={row.i}
                row={row}
                currentY={currentY}
                currentX={currentX}
              />
            ))}
          </div>
        </div>
        <section className="keyboard">
          {Object.entries(keyboard).map((row, i) => (
            <ul key={i} className={row[0]}>
              {row[1].map((keyName, i) => (
                <li key={i} className={keyName}>
                  <button
                    tabIndex="0"
                    onClick={() => keyClick(keyName)}
                    className={getKeyResultClass(keyName)}
                    disabled={disableKeys}
                  >{keyName}</button>
                </li>
              ))}
            </ul>
          ))}
        </section>
      </div>
    </>
  )
}



export default Board