import InputBox from './InputBox.jsx'
import PropTypes from 'prop-types';

function WordRow({row, currentY, currentX}) {
  return (
    <div className={`word-row ${row.rowClass}`}>
      {row.boxes.map((box) => (
        <InputBox
          key={box.i}
          box={box}
          currentX={currentY === row.i ? currentX : null}
        />
      ))}
    </div>
  )
}

WordRow.propTypes = {
  row: PropTypes.object.isRequired,
  currentY: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
}


export default WordRow