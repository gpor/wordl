import { createContext, useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { TargetWord } from '../../lib/words.js'
import { newWordRows } from '../../lib/board.js'

const WordContext = createContext()

export const WordProvider = ({children}) => {
  const [targetWord] = useState(new TargetWord)
  const [wordRows] = useState(newWordRows(targetWord))
  const [currentY, setCurrentY] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  return <WordContext.Provider value={{
    targetWord,
    wordRows,
    currentX,
    currentY,
    setCurrentX,
    setCurrentY,
  }}>
    {children}
  </WordContext.Provider>
}

export default WordContext

WordProvider.propTypes = {
  children: PropTypes.node.isRequired,
}