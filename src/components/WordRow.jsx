import InputBox from './InputBox.jsx'
import PropTypes from 'prop-types';

function WordRow({row, currentY, currentX, clickRowBox}) {
  
  const clickBox = (box) => {
    console.log('row', row.i, 'box', box.i);
    clickRowBox(row, box)
  }

  return (
    <div className="word-row">
      {row.boxes.map((box) => (
        <InputBox
          key={box.i}
          box={box}
          currentX={currentY === row.i ? currentX : null}
          clickBox={clickBox}
        />
      ))}
    </div>
  )
}

WordRow.propTypes = {
  row: PropTypes.object.isRequired,
  currentY: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  clickRowBox: PropTypes.func,
}


export default WordRow