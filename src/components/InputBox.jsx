import PropTypes from 'prop-types';

function InputBox({box, currentX}) {
  
  return (
    <div
      className={`input-box ${currentX === box.i && '-current'} ${box.resultClass}`}
    >
      {/* Need a way to show the pipe if there is no box value 
        The last letter of an incorrect word should still display
      */}
      <p>{currentX === box.i && box.val === "" ? '|' : box.val}</p>
    </div>
  )
}

InputBox.propTypes = {
  box: PropTypes.object.isRequired,
  currentX: PropTypes.number,
}

export default InputBox