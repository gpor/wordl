import { createContext, useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { TargetWord } from '../../lib/words.js'
//import and create a wordReducer if it is neccesary to update state for it

const WordContext = createContext()

export const WordProvider = ({children}) => {
  const [targetWord, setTargetWord] = useState(new TargetWord)

  return <WordContext.Provider value={{
    targetWord,
  }}>
    {children}
  </WordContext.Provider>
}

export default WordContext

WordProvider.propTypes = {
  children: PropTypes.node.isRequired,
}