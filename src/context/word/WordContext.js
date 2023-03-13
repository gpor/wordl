import { createContext, useState, useReducer } from 'react'
import PropTypes from 'prop-types'

import {keyboardData} from '../../data/keyboard.js'

import { TargetWord } from '../../lib/words.js'
import { newWordRows } from '../../lib/board.js'

const WordContext = createContext()

export const WordProvider = ({children}) => {
  const [keyboard] = useState(keyboardData)
  const [targetWord] = useState(new TargetWord)
  const [wordRows, setWordRows] = useState(newWordRows(targetWord))
  const [currentY, setCurrentY] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const [letterChoices, setLetterChoices] = useState([]) // records the users letter choice so it can be reflected in the keyboard
  const [disableKeys, setDisableKeys] = useState(false)

  return <WordContext.Provider value={{
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

  }}>
    {children}
  </WordContext.Provider>
}

export default WordContext

WordProvider.propTypes = {
  children: PropTypes.node.isRequired,
}