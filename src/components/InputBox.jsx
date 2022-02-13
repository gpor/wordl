import PropTypes from 'prop-types';


function InputBox({box, currentX, clickBox}) {
  
  const onClick = (e) => {
    clickBox(box)
  }
  
  return (
    <div
      className={`input-box ${currentX === box.i && '-current'} ${box.resultClass}`}
      onClick={onClick}
    >
      <p>{currentX === box.i ? '|' : box.val}</p>
    </div>
  )
}

InputBox.propTypes = {
  box: PropTypes.object.isRequired,
  currentX: PropTypes.number,
  clickBox: PropTypes.func,
}

export default InputBox