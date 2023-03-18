import { nAcross, nDown } from '../lib/board.js'
import { useRef, useEffect, useContext } from 'react'
import WordRow from '../components/WordRow.jsx'
import WordContext from '../context/word/WordContext.js'
import { toast } from 'react-toastify'

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
              toast.success('Well done.')
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
            // add flip transition to row letters
            setWordRows(currentWordRows => {
              currentWordRows[currentY].rowClass = 'flip'
              return [
                ...currentWordRows,
              ]
            })
            setCurrentY(currentY => currentY + 1)
            setCurrentX(0)
          } else {
            shakeRow()
            console.log('At end of row and clicked enter')
            setCurrentX(4) // not a valid word, send cursor to end of row
            toast.error('That word is not in the list.')
          }
          if (currentY === nDown - 1) {
            if (!check.win) {
              setDisableKeys(true)
              toast.error(`Bad luck. Todays word is ${targetWord.word}.`)
            }
          }
        } else {
          shakeRow()
          console.log('Not at end of row and clicked enter')
          toast.error('Enter a 5 letter word.')
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
  )
}

export default Board