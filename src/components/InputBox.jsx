import PropTypes from 'prop-types';

function InputBox({box, currentX}) {
  return (
    <div className="box-container">
      <div className={`input-box ${currentX === box.i && '-current'}`}>
        <p>{currentX === box.i && box.val === "" ? '|' : box.val}</p>
      </div>
      <div className={`box-backing ${box.resultClass}`}>
        <p>{ box.val ? box.val : '!'}</p>
      </div>
    </div>
  )
}

InputBox.propTypes = {
  box: PropTypes.object.isRequired,
  currentX: PropTypes.number,
}

export default InputBox