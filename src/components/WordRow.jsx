import InputBox from './InputBox.jsx'
import PropTypes from 'prop-types';

function WordRow({row}) {
  return (
    <div className="word-row">
      {row.boxes.map((box) => (
        <InputBox key={box.i} box={box} />
      ))}
    </div>
  )
}

WordRow.propTypes = {
  row: PropTypes.object,
}


export default WordRow